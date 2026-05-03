<?php

namespace App\Models;

use Database\Factories\LeaveFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Leave extends Model
{
    /** @use HasFactory<LeaveFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'leave_type', 'start', 'end', 'description', 'is_approve'];

    protected $casts = [
        'start' => 'date',
        'end' => 'date',
        'is_approve' => 'boolean'
    ];

    public function calaculateVL(int $user_id, string $leave) {
        $balance = Balance::findOrFail($user_id);
    }


    // relationships
    public function user() {
        return $this->belongsTo(User::class);
    }


     public static function checkDateRange(int $userId, $start, $end)
    {
        return self::where('user_id', $userId)
            ->where(function ($query) use ($start, $end) {
                $query->whereBetween('start', [$start, $end])
                    ->orWhereBetween('end', [$start, $end])
                    ->orWhere(function ($q) use ($start, $end) {
                        $q->where('start', '<=', $start)
                        ->where('end', '>=', $end);
                    });
            })
            ->exists();
    }

}
