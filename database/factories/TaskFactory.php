<?php

namespace Database\Factories;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => $this->faker->sentence(3),
            "description" => $this->faker->paragraph(),
            "status" => TaskStatus::PENDING,
            "deadline" => now()->addDays(rand(1, 30)),
        ];
    }

    public function pending(): static
    {
        return $this->state(
            fn() => [
                "status" => TaskStatus::PENDING,
                "deadline" => now()->addDays(rand(3, 10)),
            ]
        );
    }

    public function inProgress(): static
    {
        return $this->state(
            fn() => [
                "status" => TaskStatus::IN_PROGRESS,
                "deadline" => now()->addDays(rand(1, 5)),
            ]
        );
    }

    public function completed(): static
    {
        return $this->state(
            fn() => [
                "status" => TaskStatus::COMPLETED,
                "deadline" => now()->subDays(rand(5, 10)),
            ]
        );
    }

    public function delayed(): static
    {
        return $this->state(
            fn() => [
                "status" => TaskStatus::PENDING,
                "deadline" => now()->subDays(rand(1, 5)),
                "title" => $this->faker->words(3, true),
            ]
        );
    }
}
