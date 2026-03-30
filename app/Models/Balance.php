<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    protected $fillable = [
        'user_id',
        'vl_balance',
        'vl_used',
        'sl_balance',
        'sl_used',
        'undertime',
        'month',
        'year'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getVL() {
        // vl = current - ( undertime + (used vl or used fl)) + 1.25
        // return
    }

    public function getSL() {
        // sl = current - used sl + current leave
        // return
    }
}
