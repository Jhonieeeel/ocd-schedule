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
        'fl_balance',
        'fl_used',
        'undertime',
        'month',
        'year'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getVL(): float {
        $vl = $this->vl_balance - ($this->undertime + ($this->used_vl ?? $this->used_fl)) + 1.25;
        return $vl;
    }

    public function getSL(): float {
        $sl = $this->sl_balance - ($this->used_sl) + 1.25;
        return $sl;
    }

}
