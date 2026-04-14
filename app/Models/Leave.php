<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $fillable = ['user_id', 'leave_type', 'date_from', 'date_to', 'description'];

    protected $casts = [
        'date_from' => 'date',
        'date_to' => 'date'
    ];



    public function user() {
        return $this->belongsTo(User::class);
    }
}
