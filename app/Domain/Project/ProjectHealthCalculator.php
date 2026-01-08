<?php

namespace App\Domain\Project;

use App\Enums\ProjectHealth;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

final class ProjectHealthCalculator
{
    public static function calculateHealth(Collection $tasks): ProjectHealth
    {
        if ($tasks->isEmpty()) return ProjectHealth::REGULAR;

        $total = $tasks->count();
        $delayed = $tasks->filter(
            fn (Task $task) => $task->isDelayed()
        )->count();

        return ($delayed / $total) * 100 > 20 ? ProjectHealth::ALERT : ProjectHealth::REGULAR;
    }
}
