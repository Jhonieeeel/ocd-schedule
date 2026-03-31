<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\LeaveController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // balance
    Route::get("balances", [BalanceController::class, 'index'])->name('balance.index');
    Route::post("balances", [BalanceController::class, "store"])->name("balance.store");
    Route::get("balances/{balance}", [BalanceController::class, 'show'])->name('balance.show');
    Route::put("balances/{balance}", [BalanceController::class, 'update'])->name('balance.update');
    Route::delete('balances/{balance}', [BalanceController::class, 'destroy'])->name('balance.destroy');

    // leave
    Route::get("leave", [LeaveController::class, 'index'])->name('leave.index');

});

require __DIR__.'/settings.php';
