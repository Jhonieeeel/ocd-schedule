<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class AttendanceLog extends Model
{
    protected $fillable = [
        'user_id',
        'balance_id',
        'date',
        'minutes',
        'hours',
        'cutoff',
        'is_tardy',
        'month',
        'year',
        'total_minutes'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function balance() {
        return $this->belongsTo(Balance::class);
    }

    public function minuteConversion($minutes) {

        $conversion = [];
        for($minutes = 1; $minutes <= 60; $minutes++) {
            $conversion[$minutes] = round($minutes / 480, 3);
        }

        return $conversion[$minutes];

        // return Attribute::make();
    }

    public function hourConversion($hours) {
        $conversion = [];
        for($hours = 1; $hours <= 8; $hours ++) {
            $conversion[$hours] = round($hours / 8, 3);
        }


        return $conversion[$hours];
    }
}
