<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProcessState extends Model
{
    protected $table = 'process_state';

    protected $fillable = ['name', 'is_closed'];

    /**
     * The status labels, exactly as stored in process_state.name and as
     * matched by App\Livewire\Dashboard::statusClass(). Value: is_closed.
     */
    public const LABELS = [
        'Started' => false,
        'Not started' => false,
        'Not sent' => false,
        'Under evaluation' => false,
        'Cancelled' => true,
        'Rejected' => true,
        'In revision' => false,
        'Awarded' => true,
        'Client data missing' => false,
    ];

    protected function casts(): array
    {
        return ['is_closed' => 'boolean'];
    }

    public function processes(): HasMany
    {
        return $this->hasMany(Process::class, 'state_id');
    }
}
