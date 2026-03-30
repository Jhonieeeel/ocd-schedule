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
    Route::get("balance", [BalanceController::class, 'index'])->name('balance.index');

    // leave
    Route::get("leave", [LeaveController::class, 'index'])->name('leave.index');

});

require __DIR__.'/settings.php';
