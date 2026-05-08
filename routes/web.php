<?php

use App\Http\Controllers\AttendanceLogController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // leave - all roles can access
    Route::get("leaves", [LeaveController::class, 'index'])->name('leave.index');
    Route::post("leaves", [LeaveController::class, 'store'])->name('leave.store');
    Route::delete('leaves/{leave}', [LeaveController::class, 'destroy'])->name('leave.destroy');
    Route::put('leaves/{leave}', [LeaveController::class, 'update'])->name('leave.update');

    // balance - own balance (all roles)
    Route::get("balances", [BalanceController::class, 'index'])->name('balance.index');

    // balance - admin only
    Route::middleware(['role:hr'])->group(function () {
        // balances
        Route::get("all_balances", [BalanceController::class, 'all_balances'])->name('all_balances');
        Route::post('all_balances', [BalanceController::class, 'carry_over'])->name('balance.carry');
        Route::get("all_balance", [BalanceController::class, 'all'])->name('balance.all');
        Route::post("balances", [BalanceController::class, "store"])->name("balance.store");
        Route::get("balances/{balance}", [BalanceController::class, 'show'])->name('balance.show');
        Route::put("balances/{balance}", [BalanceController::class, 'update'])->name('balance.update');
        Route::delete('balances/{balance}', [BalanceController::class, 'destroy'])->name('balance.destroy');

        // logs
        Route::post("attendance_logs", [AttendanceLogController::class, 'store'])->name('attendance_logs.store');
        Route::delete("attendance_logs/{attendanceLog}", [AttendanceLogController::class, 'destroy'])->name('attendance_logs.destroy');
        Route::put("attendance_logs/{attendance_log}", [AttendanceLogController::class, 'update'])->name("attendance_log.update");

        // users
        Route::get('users', [UserController::class,'index'])->name('users.index');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
    });


});

require __DIR__.'/settings.php';
