<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class TaskController extends Controller
{
    public function update(Request $request, Task $task): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', new Enum(TaskStatus::class)],
            'title' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        $task->update($validated);

        return back();
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        Task::create($request->validated());

        return back();
    }
}
