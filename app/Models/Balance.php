<?php

namespace App\Models;

use Attribute;
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

        Balance::firstOrCreate(
            [
                'user_id' => $this->user_id,
                'year' => $nextYear,
                'month' => $nextMonth
            ],
            [
                'vl_balance' => $this->recalculateVL(),
                'sl_balance' => $this->recalculateSL(),
                'spl_balance' => $this->spl_balance
            ]
        );


    }

    public function increaseUndertime(float $undertime): void {
        $this->undertime = $undertime;

        $this->save();
    }

    public function deductBalance(int $leaveDays): void {

        if ($this->fl_balance <= 0) {
            $this->vl_used += $leaveDays;
        }elseif ($leaveDays > $this->fl_balance) {
            $this->vl_used += $leaveDays - $this->fl_balance;
            $this->fl_used += $this->fl_balance;
            $this->fl_balance += 0;
        }else {
            $this->fl_balance -= $leaveDays;
            $this->fl_used += $leaveDays;
        }

        $this->save();

    }

    public function recalculateSL(): float {

        $this->sl_balance = ($this->sl_balance - $this->sl_used) + 1.25;

        return $this->sl_balance;


    }

    public function recalculateVL(): float {

        $this->vl_balance = $this->vl_balance - ($this->undertime + ($this->vl_used + $this->fl_used)) + 1.25;

        return $this->vl_balance;
    }


    public function getVL(float $undertime): float {

        $this->vl_balance = $this->vl_balance - (($thundertime ?? 0) + ($this->used_vl ?: $this->used_fl)) + 1.25;

        return $this->vl_balance;

    }

    public function getSL(): float {
        $sl = $this->sl_balance - ($this->used_sl) + 1.25;
        return $sl;
    }

    // conversion

    public function updateUndertime(): void
    {
        $sum = $this->attendanceLogs()->sum('total_minutes');

        info($this->attendanceLogs()->where('is_tardy', true)->count());


        $this->update([
            'undertime'       => round($sum / 480, 3),
            'tardiness_count' => $this->attendanceLogs()->where('is_tardy', true)->count(),
            'undertime_count' => $this->attendanceLogs()->where('is_tardy', false)->count(),
        ]);
    }

}

