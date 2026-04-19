<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    protected $fillable =[
        'user_id', 'first_name', 'middle_name', 'last_name', 'sex', 'appointment_number', 'avatar'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
