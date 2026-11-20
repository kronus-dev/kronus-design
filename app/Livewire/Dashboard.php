<?php

namespace App\Livewire;

use App\Models\Process;
use App\Models\ProcessState;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Title;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

#[Title('Dashboard')]
class Dashboard extends Component
{
    use WithPagination;

    public const PER_PAGE = 10;

    /** '' (default order) or 'status'. */
    #[Url(except: '')]
    public string $sortBy = '';

    #[Url(except: 'asc')]
    public string $sortDirection = 'asc';

    /**
     * Click on the Status header cycles: unsorted -> A to Z -> Z to A -> unsorted.
     */
    public function sort(string $column): void
    {
        if ($column !== 'status') {
            return;
        }

        if ($this->sortBy !== 'status') {
            $this->sortBy = 'status';
            $this->sortDirection = 'asc';
        } elseif ($this->sortDirection === 'asc') {
            $this->sortDirection = 'desc';
        } else {
            $this->sortBy = '';
            $this->sortDirection = 'asc';
        }

        $this->resetPage();
    }

    #[Computed]
    public function processes(): LengthAwarePaginator
    {
        return Process::query()
            ->with(['client:id,name', 'type:id,name', 'owner:id,name', 'state:id,name'])
            ->when($this->sortBy === 'status', function ($query) {
                // Order by the status name without a join.
                $query->orderBy(
                    ProcessState::select('name')->whereColumn('process_state.id', 'process.state_id'),
                    $this->sortDirection === 'desc' ? 'desc' : 'asc',
                );
            })
            ->orderByDesc('process.internal_code')
            ->paginate(self::PER_PAGE);
    }

    /**
     * Top four cards.
     * TODO: replace the sample values with real queries. They need the HR tables
     * from hr_schema.sql (employee.is_active, attendance, leave_request, employee_certification).
     */
    #[Computed]
    public function kpis(): array
    {
        return [
            ['label' => 'Active employees', 'value' => '148', 'delta' => '+2.8%', 'up' => true],
            ['label' => 'On site · last working day', 'value' => '108', 'delta' => '-3.2%', 'up' => false],
            ['label' => 'Out this week', 'value' => '9', 'delta' => '+2', 'up' => false],
            ['label' => 'Certificates expiring ≤ 30 days', 'value' => '14', 'delta' => '+5', 'up' => false],
        ];
    }

    /**
     * Pastel text colour per status. Status names must match process_state.name.
     * Only greens, greys, yellow and orange are used.
     */
    public static function statusClass(?string $name): string
    {
        return match ($name) {
            'Awarded' => 'text-emerald-300',
            'Started' => 'text-emerald-200',
            'Not started' => 'text-zinc-200',
            'Not sent', 'Under evaluation' => 'text-yellow-200',
            'In revision', 'Client data missing' => 'text-orange-300',
            'Cancelled' => 'text-zinc-400 line-through',
            'Rejected' => 'text-zinc-400',
            default => 'text-zinc-300',
        };
    }

    public function render()
    {
        return view('livewire.dashboard', [
            'company' => config('app.name'),
        ]);
    }
}
