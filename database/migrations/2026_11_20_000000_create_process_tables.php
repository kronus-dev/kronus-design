<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tables behind the dashboard's process list.
 * Singular table names, as the design's models expect (`process`, `client`, ...).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('employee', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Status list. `name` must match the labels in App\Livewire\Dashboard::statusClass().
        Schema::create('process_state', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->boolean('is_closed')->default(false);
            $table->timestamps();
        });

        // The table behind process.type_id (missing from the original diagram).
        Schema::create('process_type', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('process', function (Blueprint $table) {
            $table->id();
            $table->string('internal_code')->unique();
            $table->foreignId('client_id')->nullable()->constrained('client')->nullOnDelete();
            $table->foreignId('type_id')->nullable()->constrained('process_type')->nullOnDelete();
            $table->foreignId('state_id')->nullable()->constrained('process_state')->nullOnDelete();
            $table->foreignId('employee_id')->nullable()->constrained('employee')->nullOnDelete();
            $table->date('entry_date')->nullable();
            $table->date('preview_end_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();

            $table->index('state_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('process');
        Schema::dropIfExists('process_type');
        Schema::dropIfExists('process_state');
        Schema::dropIfExists('employee');
        Schema::dropIfExists('client');
    }
};
