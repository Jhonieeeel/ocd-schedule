<?php

namespace Database\Seeders;

use App\Models\Balance;
use App\Models\Holiday;
use App\Models\Leave;
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

        Role::create(['name' => 'super-admin']);


        Role::create(['name' => 'hr']);
        Role::create(['name' => 'gip']);
        Role::create(['name' => 'employee']);

        $employees = [
            [
                'firstname' => 'Ray Francis',
                'lastname' => 'Alingasa',
                'email' => 'alingasa@example.com',
                'vl_balance' => 5.584,
                'vl_used' => 0,
                'sl_balance' => 10.792,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Jenn Eric',
                'lastname' => 'Borday',
                'email' => 'borday@example.com',
                'vl_balance' => 6.188,
                'vl_used' => 0,
                'sl_balance' => 11.583,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Ronald Anthony',
                'lastname' => 'Briol',
                'email' => 'briol@example.com',
                'vl_balance' => 14.313,
                'vl_used' => 0,
                'sl_balance' => 22.833,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Marc Gil',
                'lastname' => 'Calang',
                'email' => 'calang@example.com',
                'vl_balance' => 61.89,
                'vl_used' => 0,
                'sl_balance' => 154.583,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 1,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Rosalie',
                'lastname' => 'Caprizo',
                'email' => 'caprizo@example.com',
                'vl_balance' => 6.368,
                'vl_used' => 0,
                'sl_balance' => 11.583,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Lorene',
                'lastname' => 'Catedral',
                'email' => 'catedral@example.com',
                'vl_balance' => 19.875,
                'vl_used' => 0,
                'sl_balance' => 308.25,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Carlito Jr',
                'lastname' => 'Clarete',
                'email' => 'clarete@example.com',
                'vl_balance' => 6.53,
                'vl_used' => 0,
                'sl_balance' => 11.708,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'spl_used' => 0,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Kim',
                'lastname' => 'Durango',
                'email' => 'durango@example.com',
                'vl_balance' => 85.496,
                'vl_used' => 0,
                'sl_balance' => 126.5,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],

            [
                'firstname' => 'Aizy Lyn',
                'lastname' => 'Joloyohoy',
                'email' => 'aizy@example.com',
                'vl_balance' => 95.102,
                'vl_used' => 5,
                'sl_balance' => 114.162,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 2,
                'spl_used' => 1,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Ryan',
                'lastname' => 'Joloyohoy',
                'email' => 'ryan@example.com',
                'vl_balance' => 76.8,
                'vl_used' => 5,
                'sl_balance' => 112.73,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 1,
                'spl_balance' => 1,
                'spl_used' => 2,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Diana',
                'lastname' => 'Lim',
                'email' => 'lim@example.com',
                'vl_balance' => 55.575,
                'vl_used' => 0,
                'sl_balance' => 69.462,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Dave',
                'lastname' => 'Madayag',
                'email' => 'madagayag@example.com',
                'vl_balance' => 79.479,
                'vl_used' => 0,
                'sl_balance' => 100,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'hr'
            ],
            [
                'firstname' => 'Georiss Mae',
                'lastname' => 'Maniago',
                'email' => 'maniago@example.com',
                'vl_balance' => 41.644,
                'vl_used' => 0,
                'sl_balance' => 53.667,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 0,
                'spl_used' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'hr'
            ],
            [
                'firstname' => 'Amado',
                'lastname' => 'Posas',
                'email' => 'posas@example.com',
                'vl_balance' => 139.122,
                'vl_used' => 0,
                'sl_balance' => 270.222,
                'sl_used' => 0,
                'fl_balance' => 4,
                'fl_used' => 1,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'April Rose Anne',
                'lastname' => 'Sanchez',
                'email' => 'sanchez@example.com',
                'vl_balance' => 81.921,
                'vl_used' => 0,
                'sl_balance' => 122.5,
                'sl_used' => 0,
                'fl_balance' => 3,
                'fl_used' => 2,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Marie Lynn',
                'lastname' => 'Tadle',
                'email' => 'tadle@example.com',
                'vl_balance' => 132.852,
                'vl_used' => 0,
                'sl_balance' => 259,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 2,
                'spl_balance' => 2,
                'spl_used' => 1,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'John Lenn',
                'lastname' => 'Uayan',
                'email' => 'uayan@example.com',
                'vl_balance' => 72.169,
                'vl_used' => 0,
                'sl_balance' => 127.5,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Grace',
                'lastname' => 'Villanueva',
                'email' => 'villanueva@example.com',
                'vl_balance' => 65.113,
                'vl_used' => 0,
                'sl_balance' => 127.5,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
            [
                'firstname' => 'Angelic Mae',
                'lastname' => 'Yu',
                'email' => 'angelic@example.com',
                'vl_balance' => 6.516,
                'vl_used' => 0,
                'sl_balance' => 11.583,
                'sl_used' => 0,
                'fl_balance' => 5,
                'fl_used' => 0,
                'spl_balance' => 3,
                'undertime' => 0,
                'month' => 1,
                'year' => 2023,
                'role' => 'employee'
            ],
        ];


        foreach($employees as $employee) {
            $user = User::create([
                'firstname' => $employee['firstname'],
                'lastname' => $employee['lastname'],
                'email' => $employee['email'],
                'password' => bcrypt('password'),
                'name' => 'something'
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
                'spl_used' => $employee['spl_used'] ?? 0,
                'undertime' => $employee['undertime'],
                'month' => $employee['month'],
                'year' => $employee['year']
            ]);

            $user->assignRole($employee['role']);
        }

        $super_admin = User::create([
            'firstname' => 'Super',
            'lastname' => 'Admin',
            'email' => 'superadmin@ocdcaraga.com',
            'password' => 'ocdcaraga13',
            'name' => 'anything'
        ]);

        Holiday::create([
            'name' => 'Araw ng Kamote',
            'month' => 4,
            'day' => 9
        ]);

        $super_admin->assignRole('super-admin');

        // Leave::factory()->count(10000)->create();

    }
}
