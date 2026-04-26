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
        Role::create(['name' => 'gasu_admin'])
        Role::create(['name' => 'pmu_admin']);
        Role::create(['name' => 'super-admin']);


        Role::create(['name' => 'hr']);
        Role::create(['name' => 'gip']);
        Role::create(['name' => 'employee']);


        $employees = [
            [
                'name' => 'Barry Arreo',
                'email' => 'barry@example.com',
                'role' => 'hr'
            ],
            [
                'name' => 'Michael Overly',
                'email' => 'michael@example.com',
                'role' => 'hr'
            ]
        ];

        foreach($employees as $employee) {
            $user = User::factory()->create([
                'name' => $employee['name'],
                'email' => $employee['email']
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
