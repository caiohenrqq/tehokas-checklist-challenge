import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export const useKanban = (initialTasks) => {
	const [localTasks, setLocalTasks] = useState(initialTasks);

	useEffect(() => {
		setLocalTasks(initialTasks);
	}, [initialTasks]);

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const taskToMove = localTasks.find((t) => t.id.toString() === draggableId);
		if (!taskToMove) return;

		const remainingTasks = localTasks.filter(
			(t) => t.id.toString() !== draggableId,
		);

		const destColumnTasks = remainingTasks.filter(
			(t) => t.status === destination.droppableId,
		);

		const otherColumnTasks = remainingTasks.filter(
			(t) => t.status !== destination.droppableId,
		);

		destColumnTasks.splice(destination.index, 0, {
			...taskToMove,
			status: destination.droppableId,
		});

		const finalTasks = [...otherColumnTasks, ...destColumnTasks];

		setLocalTasks(finalTasks);

		router.patch(
			route("tasks.reorder"),
			{
				ids: destColumnTasks.map((t) => t.id),
				status: destination.droppableId,
			},
			{
				preserveState: true,
				preserveScroll: true,
				replace: true,
				onError: () => setLocalTasks(initialTasks),
			},
		);
	};

	const columns = {
		pending: localTasks.filter((t) => t.status === "pending"),
		in_progress: localTasks.filter((t) => t.status === "in_progress"),
		completed: localTasks.filter((t) => t.status === "completed"),
	};

	return {
		localTasks,
		columns,
		onDragEnd,
	};
};
