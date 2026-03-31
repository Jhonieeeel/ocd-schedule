<?php

namespace Database\Seeders;

use App\Models\Balance;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $test = User::factory()->create([
            'name' => 'Barry Arreo',
            'email' => 'barry@example.com',
        ]);

        $niel = User::factory()->create([
            'name' => 'Test Niel',
            'email' => 'niel@example.com',
        ]);


        $balance = Balance::create([
            'user_id' => $test->id,
            'vl_balance' =>  35.488,
            'sl_balance' => 19.452,
            'fl_balance' => 5,
            'undertime' => 0.017,
            'month' => 11,
            'year' => 2025
        ]);

    }
}
