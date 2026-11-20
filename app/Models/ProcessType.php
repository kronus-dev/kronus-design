<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/** The table behind process.type_id. */
class ProcessType extends Model
{
    protected $table = 'process_type';

    protected $fillable = ['name'];

    public function processes(): HasMany
    {
        return $this->hasMany(Process::class, 'type_id');
    }
}
