<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * A process (proposal / job). Table `process`.
 *
 * Related tables: client, employee (process owner), process_state (status)
 * and process_type (the table behind process.type_id).
 */
class Process extends Model
{
    protected $table = 'process';

    protected $fillable = [
        'internal_code', 'client_id', 'type_id', 'state_id', 'employee_id',
        'entry_date', 'preview_end_date', 'end_date',
    ];

    protected function casts(): array
    {
        return [
            'entry_date' => 'date',
            'preview_end_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(ProcessType::class, 'type_id');
    }

    public function state(): BelongsTo
    {
        return $this->belongsTo(ProcessState::class, 'state_id');
    }

    /** "Process owner" (responsável pelo processo). */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
