<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReorderTaskRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $task->update($request->validated());

        return back();
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        Task::create($request->validated());

        return back();
    }

    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        return back();
    }

    public function reorder(ReorderTaskRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            foreach ($request->input('ids') as $index => $id) {
                Task::where('id', $id)->update([
                    'position' => $index,
                    'status'   => $request->input('status'),
                ]);
            }
        });

        return back();
    }
}
