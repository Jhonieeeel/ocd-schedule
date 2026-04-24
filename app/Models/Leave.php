<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Leave extends Model
{
    protected $fillable = ['user_id', 'leave_type', 'date_from', 'date_to', 'description', 'is_approve'];

    protected $casts = [
        'date_from' => 'date',
        'date_to' => 'date',
        'is_approve' => 'boolean'
    ];



    public function user() {
        return $this->belongsTo(User::class);
    }
}
