<?php

namespace Database\Seeders;

use App\Models\Balance;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Role::create(['name' => 'hr']);
        Role::create(['name' => 'gip']);
        Role::create(['name' => 'employee']);


        $employees = [
            [
                'name' => 'Wristly Junsan Abrot',
                'email' => 'wristly@example.com',
                'vl_balance' => 3.813,
                'vl_used' => 0,
                'sl_balance' => 11.25,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'undertime' => 0.494,
                'month' => 11,
                'year' => 2024
            ],
            [
                'name' => 'Ray Francis Alingasa',
                'email' => 'ray@example.com',
                'vl_balance' => 20.675,
                'vl_used' => 0,
                'sl_balance' => 38.292,
                'sl_used' => 0,
                'fl_balance' => 0,
                'fl_used' => 1,
                'undertime' => 0.069,
                'month' => 11,
                'year' => 2024
            ],
            [
                'name' => 'Barry Q. Arreo',
                'email' => 'barry@example.com',
                'vl_balance' => 38.402,
                'vl_used' => 2,
                'sl_balance' => 34.452,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'undertime' => 0.248,
                'month' => 11,
                'year' => 2024
            ],
        ];

        foreach($employees as $employee) {
            $user = User::factory()->create([
                'name' => $employee['name'],
                'email' => $employee['email'],
            ]);

            Balance::create([
                'user_id' => $user->id,
                'vl_balance' => $employee['vl_balance'],
                'vl_used' => $employee['vl_used'],
                'sl_balance' => $employee['sl_balance'],
                'sl_used' => $employee['sl_used'],
                'fl_balance' => $employee['fl_balance'],
                'fl_used' => $employee['fl_used'],
                'undertime' => $employee['undertime'],
                'month' => $employee['month'],
                'year' => $employee['year']
            ]);

            if ($user->id == 3) {
                $user->assignRole('hr');
            }else {
                $user->assignRole('employee');
            }

        }


    }
}
