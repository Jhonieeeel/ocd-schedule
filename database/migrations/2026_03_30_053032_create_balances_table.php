<?php

use App\Models\User;
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
        Schema::create('balances', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();

            // vl
            $table->decimal('vl_balance', 8, 3)->nullable()->default(0);
            $table->decimal('vl_used', 8, 3)->nullable()->default(0);

            // sl
            $table->decimal('sl_balance', 8, 3)->nullable()->default(0);
            $table->decimal('sl_used', 8, 3)->nullable()->default(0);

            // spl
            $table->decimal('spl_balance')->nullable()->default(3);
            $table->decimal('spl_used')->nullable()->default(0);

            // fl
            $table->decimal('fl_balance')->nullable()->default(5);
            $table->decimal('fl_used')->nullable()->default(0);

            $table->decimal('undertime', 8, 3)->nullable()->default(0);

            $table->tinyInteger('month')->nullable()->default(date('n')); // month = 01-12
            $table->integer('year')->nullable(date('Y')); // year = 2024

            // last updated
            $table->date('as_of')->nullable();

            // counts
            $table->integer('tardiness_count')->nullable()->default(0);
            $table->integer('undertime_count')->nullable()->default(0);

            // indexing

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balances');
    }
};
