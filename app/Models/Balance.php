<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    protected $fillable = [
        'user_id',
        'vl_balance',
        'vl_used',
        'sl_balance',
        'sl_used',
        'fl_balance',
        'fl_used',
        'spl_balance',
        'spl_used',
        'undertime',
        'month',
        'year',
        'as_of',
        'tardiness_count',
        'undertime_count'
    ];

    protected $casts = [
        'vl_balance' => 'float',
        'vl_used'    => 'float',
        'sl_balance' => 'float',
        'sl_used'    => 'float',
        'fl_balance' => 'float',
        'spl_balance' => 'float',
        'spl_used' => 'float',
        'fl_used'    => 'float',
        'undertime'  => 'float',
        'as_of'      => 'date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function attendanceLogs()
    {
        return $this->hasMany(AttendanceLog::class);
    }

    public function checkBalance($month, $year): void {


        $nextMonth = $month == 12 ? 1 : $month + 1;
        $nextYear = $month == 12 ? $year + 1 : $year;

        $isNewYear = $month == 12;
        Balance::firstOrCreate(
            [
                'user_id' => $this->user_id,
                'year'    => $nextYear,
                'month'   => $nextMonth,
            ],
            [
                'vl_balance'  => $this->recalculateVL($isNewYear),
                'sl_balance'  => $isNewYear ? 5 : $this->recalculateSL(),
                'fl_balance'  => $isNewYear ? 5 : $this->fl_balance,
                'spl_balance' => $isNewYear ? 3 : $this->spl_balance
            ]
        );

    }

    // checker
    public function checkSLBalance(int $leaveDays) {
        if ($leaveDays > $this->sl_balance) {
            return back()->withErrors(['leave_type' => 'Not enough balance. SL: '.$this->sl_balance.', filed days: '.$leaveDays]);
        }
    }

    public function checkSPLBalance(int $leaveDays) {
        if ($leaveDays > $this->spl_balance) {
           return back()->withErrors(['leave_type' => 'Not enough balance. SPL: '.$this->spl_balance.', filed days: '.$leaveDays]);
        }
    }

    public function checkFLBalance(int $leaveDays) {
        if ($leaveDays > $this->fl_balance) {
            return back()->withErrors(['leave_type' => 'Not enough balance. FL: '.$this->fl_balance.', filed days: '.$leaveDays]);
        }
    }

    public function checkVLBalance(int $leaveDays) {
        if ($leaveDays > $this->vl_balance) {
            return back()->withErrors(['leave_type' => 'Not enough balance. FL: '.$this->vl_balance.', filed days: '.$leaveDays]);
        }
    }

    // deduction
    public function deductSLBalance(int $leaveDays)
    {
        $this->sl_balance -= $leaveDays;
        $this->sl_used += $leaveDays;
        $this->save();
    }

    public function deductSPLBalance(int $leaveDays)
    {
        $this->spl_balance -= $leaveDays;
        $this->spl_used += $leaveDays;
        $this->save();

        info($this->spl_balance);
    }

    public function deductVLBalance(float $leaveDays)
    {
        $this->vl_balance -= $leaveDays;
        $this->vl_used += $leaveDays;
        $this->save();
    }

    public function deductFLBalance(float $leaveDays, int $month)
    {
        $isDecember = $month === 12;

        $this->fl_balance -= $leaveDays;
        $isDecember ? $this->vl_used += $leaveDays : $this->fl_used += $leaveDays;

        $this->save();
    }

    // restoration
    public function restoreSLBalance(int $leaveDays)
    {
        $this->sl_balance += $leaveDays;
        $this->sl_used -= $leaveDays;
        $this->save();
    }

    public function restoreSPLBalance(int $leaveDays) {
        $this->spl_balance += $leaveDays;
        $this->spl_used -= $leaveDays;
        $this->save();
    }

    public function restoreVLBalance(float $leaveDays)
    {
        $this->vl_balance += $leaveDays;
        $this->vl_used -= $leaveDays;
        $this->save();
    }

    public function restoreFLBalance(float $leaveDays) {
        $this->fl_balance += $leaveDays;
        $this->vl_used -= $leaveDays;
        $this->save();
    }

    // calculation
    public function recalculateSL(): float {

        $this->sl_balance = ($this->sl_balance - $this->sl_used) + 1.25;

        return $this->sl_balance;

    }

    public function recalculateVL($isNextYear): float {

        $deduction = $isNextYear ? $this->fl_balance : ($this->vl_used + $this->fl_used);

        $this->vl_balance = $this->vl_balance - ($this->undertime + $deduction ) + 1.25;

        return $this->vl_balance;
    }

    // conversion
    public function updateUndertime(): void
    {
        $logs = $this->attendanceLogs()->get(['total_minutes', 'is_tardy']);

        $totalMinutes   = $logs->sum('total_minutes');
        $tardyCount     = $logs->where('is_tardy', true)->count();
        $undertimeCount = $logs->where('is_tardy', false)->count();

        $this->update([
            'undertime'       => round($totalMinutes / 480, 3),
            'tardiness_count' => $tardyCount,
            'undertime_count' => $undertimeCount,
        ]);
    }


    public function scopeForBalance(Builder $query, $user_id, $month, $year) {
        return $query->where('user_id',$user_id)
            ->where('month', $month)
            ->where('year', $year)
            ->first();
    }



    public function checkLeaveType($leave_type, $totalLeaveDays) {
        return match ($leave_type) {
            'Vacation Leave'          => $this->checkVLBalance($totalLeaveDays),
            'Sick Leave'              => $this->checkSLBalance($totalLeaveDays),
            'Special Privilege Leave' => $this->checkSPLBalance($totalLeaveDays),
            'Mandatory/Force Leave'   => $this->checkFLBalance($totalLeaveDays),
            default                   => false
        };
    }

    public function deductLeaveType($leave_type, $totalLeaveDays) {
        return match($leave_type) {
            'Vacation Leave'          => $this->deductVLBalance($totalLeaveDays),
            'Sick Leave'              => $this->deductSLBalance($totalLeaveDays),
            'Special Privilege Leave' => $this->deductSPLBalance($totalLeaveDays),
            'Mandatory/Force Leave'   => $this->deductFLBalance($totalLeaveDays, $this->month),
            default                   => false
        };
    }

    public function restoreLeaveDays($leave_type, $totalLeaveDays) {
        return match($leave_type) {
            'Vacation Leave'          => $this->restoreVLBalance($totalLeaveDays),
            'Sick Leave'              => $this->restoreSLBalance($totalLeaveDays),
            'Special Privilege Leave' => $this->restoreSPLBalance($totalLeaveDays),
            'Mandatory/Force Leave'   => $this->restoreFLBalance($totalLeaveDays),
            default                   => false
        };
    }

}

