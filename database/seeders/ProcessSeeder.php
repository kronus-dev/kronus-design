<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Employee;
use App\Models\Process;
use App\Models\ProcessState;
use App\Models\ProcessType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

/**
 * Sample data for the dashboard. The status list is the real one;
 * clients, employees, types and processes are made up.
 */
class ProcessSeeder extends Seeder
{
    public function run(): void
    {
        foreach (ProcessState::LABELS as $name => $isClosed) {
            ProcessState::updateOrCreate(['name' => $name], ['is_closed' => $isClosed]);
        }

        $types = collect(['Construction', 'Renovation', 'Maintenance', 'Inspection', 'Consulting'])
            ->map(fn ($name) => ProcessType::firstOrCreate(['name' => $name]));

        $clients = collect([
            'Atlântico Engenharia', 'Norte Obras', 'Lisboa Metro', 'Câmara Municipal de Braga',
            'Porto Logística', 'Hospital São João', 'Algarve Resorts', 'EDP Distribuição',
        ])->map(fn ($name) => Client::firstOrCreate(['name' => $name]));

        $employees = collect([
            'Ana Ferreira', 'Bruno Costa', 'Carla Mendes', 'Diogo Santos', 'Inês Martins', 'João Pereira',
        ])->map(fn ($name) => Employee::firstOrCreate(['name' => $name]));

        $states = ProcessState::all()->values();
        $start = Carbon::create(2026, 1, 12);

        for ($i = 1; $i <= 34; $i++) {
            $entry = $start->copy()->addDays($i * 9);

            Process::updateOrCreate(
                ['internal_code' => sprintf('P-2026-%03d', $i)],
                [
                    'client_id' => $clients[$i % $clients->count()]->id,
                    'type_id' => $types[$i % $types->count()]->id,
                    'state_id' => $states[($i * 4) % $states->count()]->id,
                    'employee_id' => $employees[$i % $employees->count()]->id,
                    'entry_date' => $entry,
                    'preview_end_date' => $entry->copy()->addDays(45 + ($i % 5) * 15),
                ],
            );
        }
    }
}
