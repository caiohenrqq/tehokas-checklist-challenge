<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index(): Response
    {
        // database performance: eager loading > n + 1
        $projects = Project::with('tasks')
            ->orderByDesc('created_at')
                    ->get();

        return Inertia::render('Dashboard', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    public function show(Request $request, Project $project): Response
    {
        $project->load(['tasks' => function ($query) use ($request) {
            $query->orderBy('position', 'asc');

            if ($request->filled('priority')) $query->where('priority', $request->input('priority'));
        }]);

        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project),
            'filters' => $request->only(['priority']),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $request->user()->projects()->create($request->validated());

        return back();
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return back();
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($request->validated());

        return back();
    }
}
