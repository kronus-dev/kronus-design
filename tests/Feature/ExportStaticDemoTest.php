<?php

namespace Tests\Feature;

use Database\Seeders\ProcessSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

class ExportStaticDemoTest extends TestCase
{
    use RefreshDatabase;

    private string $out = 'storage/framework/testing/static-demo';

    protected function tearDown(): void
    {
        File::deleteDirectory(base_path($this->out));
        parent::tearDown();
    }

    public function test_it_exports_a_server_free_dashboard(): void
    {
        $this->seed(ProcessSeeder::class);

        $this->artisan('kronos:export-static', ['--out' => $this->out])->assertSuccessful();

        $html = File::get(base_path("{$this->out}/index.html"));

        $this->assertFileExists(base_path("{$this->out}/assets/app.css"));
        $this->assertStringContainsString('window.KRONOS_DEMO', $html);
        $this->assertStringContainsString('P-2026-034', $html);
        $this->assertStringContainsString('Demo User', $html);
        $this->assertStringContainsString('href="assets/app.css"', $html);
        $this->assertDoesNotMatchRegularExpression('/\swire:[\w.:-]+=/', $html);
        $this->assertStringNotContainsString('/logout', $html);
        $this->assertStringNotContainsString('livewire.js', $html);
    }
}
