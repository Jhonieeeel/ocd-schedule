<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Leave extends Model
{
    protected $fillable = ['user_id', 'leave_type', 'start', 'end', 'description', 'is_approve'];

    protected $casts = [
        'start' => 'date',
        'end' => 'date',
        'is_approve' => 'boolean'
    ];

    public function calaculateVL(int $user_id, string $leave) {
        $balance = Balance::findOrFail($id);
    }


    public function user() {
        return $this->belongsTo(User::class);
    }
}
