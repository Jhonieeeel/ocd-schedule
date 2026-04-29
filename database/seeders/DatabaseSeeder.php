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
        Role::create(['name' => 'gasu_admin']);
        Role::create(['name' => 'pmu_admin']);
        Role::create(['name' => 'super-admin']);


        Role::create(['name' => 'hr']);
        Role::create(['name' => 'gip']);
        Role::create(['name' => 'employee']);


        $employees = [
            [
                'name' => 'Barry Q. Arreo',
                'email' => 'barry@example.com',
                'vl_balance' => 33.861,
                'vl_used' => 2,
                'sl_balance' => 21.952,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 1,
                'undertime' => 0,
                'month' => 1,
                'year' => 2024,
                'role' => 'hr'
            ],
            [
                'name' => 'Rosalie Carpizo',
                'email' => 'rosalie@example.com',
                'vl_balance' => 13.034,
                'vl_used' => 0,
                'sl_balance' => 26.583,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2024,
                'role' => 'employee'
            ],

        ];

        foreach($employees as $employee) {
            $user = User::factory()->create([
                'name' => $employee['name'],
                'email' => $employee['email']
            ]);

            Balance::create([
                'user_id' => $user->id,
                'vl_balance' => $employee['vl_balance'],
                'vl_used' => $employee['vl_used'],
                'sl_balance' => $employee['sl_balance'],
                'sl_used' => $employee['sl_used'],
                'fl_balance' => $employee['fl_balance'],
                'fl_used' => $employee['fl_used'],
                'spl_balance' => $employee['spl_balance'],
                'undertime' => $employee['undertime'],
                'month' => $employee['month'],
                'year' => $employee['year']
            ]);

            $user->assignRole('hr');
        }

        $super_admin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@ocdcaraga.com',
            'password' => 'ocdcaraga13',
        ]);

        $super_admin->assignRole('super-admin');


    }
}
