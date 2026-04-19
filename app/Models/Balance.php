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
        'year',
        'as_of'
    ];

    protected $casts = [
        'vl_balance' => 'float',
        'vl_used'    => 'float',
        'sl_balance' => 'float',
        'sl_used'    => 'float',
        'fl_balance' => 'float',
        'fl_used'    => 'float',
        'undertime'  => 'float',
        'as_of'      => 'date',
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
