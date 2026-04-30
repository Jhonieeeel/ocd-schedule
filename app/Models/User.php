<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',

        // details
        'firstname',
        'lastname',
        'sex',
        'employee_number',
        'avatar'
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    // mutators
    public function name(): Attribute {
        return Attribute::make(
            set: fn (string $value) => $this->firstname." ". $this->lastname
        );
    }

    public function firstName(): Attribute {
        return Attribute::make(
            set: fn (string $value) => ucfirst($value)
        );
    }

    public function lastName(): Attribute {
        return Attribute::make(
            set: fn (string $value) => ucfirst($value)
        );
    }

    public function email(): Attribute {
        return Attribute::make(
            set: fn ($value) => strtolower($value)
        );
    }

    public function attendance() {
        return $this->hasMany(AttendanceLog::class);
    }


    public function balance()
    {
        return $this->hasMany(Balance::class);
    }
}
