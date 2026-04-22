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
            $table->decimal('vl_balance', 8, 3)->nullable()->default(0);
            $table->decimal('vl_used', 8, 3)->nullable()->default(0);
            $table->decimal('sl_balance', 8, 3)->nullable()->default(0);
            $table->decimal('sl_used', 8, 3)->nullable()->default(0);
            $table->decimal('fl_balance')->nullable()->default(0);
            $table->decimal('fl_used')->nullable()->default(0);
            $table->decimal('undertime', 8, 3)->nullable()->default();
            $table->tinyInteger('month')->nullable()->default(date('n')); // month
            $table->integer('year')->nullable(date('Y')); // year
            // last updated
            $table->date('as_of')->nullable();
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
