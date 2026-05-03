<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Leave>
 */
class LeaveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('2026-01-01', '2026-12-31');

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'leave_type' => $this->faker->randomElement([
                'CTO',
                'Auto Offset',
                'On Leave (not filled)',
                'Auto Offset (not filled)',
                'Vacation Leave',
                'Sick Leave',
                'Mandatory/Force Leave',
                'Wellness Leave',
                'Maternity Leave',
                'Paternity Leave',
                'Special Privilege Leave',
                'Solo Parent Leave',
                'Study Leave',
                '10 Day VAWC Leave',
                'Rehabilitation Privilege',
                'Special Leave Benefits for Women',
                'Special Emergency Calamity Leave',
                'Adoption Leave',
            ]),
            'start' => $start,
            'end' => (clone $start)->modify('+'.rand(1,5).' days'),
            'description' => $this->faker->sentence(),
            'is_approve' => $this->faker->boolean(),
    ];
    }
}
