<?php

namespace Database\Seeders;

use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::all();

        foreach ($projects as $project) {
            Task::factory()
                ->count(3)
                ->pending()
                ->create([
                    "project_id" => $project->id,
                ]);

            Task::factory()
                ->count(2)
                ->inProgress()
                ->create([
                    "project_id" => $project->id,
                ]);

            Task::factory()
                ->count(2)
                ->completed()
                ->create([
                    "project_id" => $project->id,
                ]);

            if (rand(1, 100) <= 80) {
                Task::factory()->count(rand(1, 3))->delayed()->create([
                    'project_id' => $project->id
                ]);
            }
        }
    }
}
