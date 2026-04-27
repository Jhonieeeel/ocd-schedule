<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendance_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('balance_id')->constrained()->cascadeOnDelete();

            // data
            $table->date('date');
            $table->integer('minutes')->nullable();
            $table->integer('hours')->nullable();

            // 1st half or 2nd
            $table->tinyInteger('cutoff');

            // true or false
            $table->boolean('is_tardy')->default(false);

            // overall
            $table->decimal('total_minutes', 8, 3)->default(0);

            // date
            $table->tinyInteger('month');
            $table->integer('year');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_logs');
    }
};
