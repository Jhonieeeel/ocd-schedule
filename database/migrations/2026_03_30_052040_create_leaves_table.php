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
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('leave_type'); // cto/auto off/filled or not , leaves 12
            $table->date('date_from');
            $table->date('date_to');
            $table->text('description')->nullable();
            $table->boolean('is_approve')->default(false);
            $table->timestamps();
        });
    }

    // auto offset = 2
    // cto = 1

    // auto + ct = n...

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
