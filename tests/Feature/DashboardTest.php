<?php

namespace Tests\Feature;

use App\Livewire\Dashboard;
use App\Models\Process;
use App\Models\ProcessState;
use App\Models\User;
use Database\Seeders\ProcessSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get('/')->assertRedirect('/login');
    }

    public function test_the_old_dashboard_url_redirects_to_the_root(): void
    {
        $this->get('/dashboard')->assertRedirect('/');
    }

    public function test_authenticated_users_see_the_dashboard_with_their_own_name(): void
    {
        $this->seed(ProcessSeeder::class);
        $user = User::factory()->create(['name' => 'Marta Silva', 'email' => 'marta@example.test']);

        $this->actingAs($user)
            ->get('/')
            ->assertOk()
            ->assertSeeLivewire(Dashboard::class)
            ->assertSee('Marta Silva')
            ->assertSee('marta@example.test')
            ->assertSee('MS')
            ->assertDontSee('Helena Rocha')
            ->assertSee('34 processes')
            ->assertSee('P-2026-034')
            ->assertSee(route('logout'), false);
    }

    public function test_status_names_match_the_dashboard_labels_exactly(): void
    {
        $this->seed(ProcessSeeder::class);

        $expected = [
            'Started', 'Not started', 'Not sent', 'Under evaluation', 'Cancelled',
            'Rejected', 'In revision', 'Awarded', 'Client data missing',
        ];

        $this->assertEqualsCanonicalizing($expected, ProcessState::pluck('name')->all());

        // Every status has its own colour, so none falls through to the default.
        foreach ($expected as $name) {
            $this->assertNotSame(Dashboard::statusClass(null), Dashboard::statusClass($name), $name);
        }
    }

    public function test_every_process_has_a_client_type_owner_and_status(): void
    {
        $this->seed(ProcessSeeder::class);

        $missing = Process::whereNull('client_id')->orWhereNull('type_id')
            ->orWhereNull('state_id')->orWhereNull('employee_id')->count();

        $this->assertSame(0, $missing);
        $this->assertNotNull(Process::first()->type?->name);
    }

    public function test_status_sort_cycles_through_asc_desc_and_off(): void
    {
        $this->seed(ProcessSeeder::class);
        $this->actingAs(User::factory()->create());

        $names = fn ($component) => collect($component->instance()->processes->items())
            ->map(fn ($p) => $p->state->name)->all();

        $component = Livewire::test(Dashboard::class)
            ->assertSet('sortBy', '')
            ->call('sort', 'status')
            ->assertSet('sortBy', 'status')
            ->assertSet('sortDirection', 'asc');

        $asc = $names($component);
        $this->assertSame('Awarded', $asc[0]);
        $this->assertSame(collect($asc)->sort()->values()->all(), $asc);

        $component->call('sort', 'status')->assertSet('sortDirection', 'desc');
        $this->assertSame('Under evaluation', $names($component)[0]);

        $component->call('sort', 'status')
            ->assertSet('sortBy', '')
            ->assertSet('sortDirection', 'asc');
        $this->assertSame('P-2026-034', $component->instance()->processes->first()->internal_code);
    }

    public function test_sort_ignores_other_columns(): void
    {
        $this->actingAs(User::factory()->create());

        Livewire::test(Dashboard::class)
            ->call('sort', 'client')
            ->assertSet('sortBy', '');
    }

    public function test_processes_are_paginated_ten_per_page(): void
    {
        $this->seed(ProcessSeeder::class);
        $this->actingAs(User::factory()->create());

        $component = Livewire::test(Dashboard::class);

        $this->assertCount(Dashboard::PER_PAGE, $component->instance()->processes->items());
        $this->assertSame(34, $component->instance()->processes->total());
    }
}
