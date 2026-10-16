import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const uid = () => Math.random().toString(36).slice(2, 10);

const initialColumns = [
  { id: uid(), title: 'Backlog' },
  { id: uid(), title: 'To Do' },
  { id: uid(), title: 'In Progress' },
  { id: uid(), title: 'Done' },
];

export const useBoardStore = create(
  persist(
    (set, get) => ({
      columns: initialColumns,
      tasks: [],

      addColumn: (title) =>
        set((state) => ({
          columns: [...state.columns, { id: uid(), title }],
        })),

      removeColumn: (columnId) =>
        set((state) => ({
          columns: state.columns.filter((c) => c.id !== columnId),
          tasks: state.tasks.filter((t) => t.columnId !== columnId),
        })),

      addTask: ({ title, description, columnId }) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uid(), title, description, columnId },
          ],
        })),

      updateTask: (taskId, patch) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, ...patch } : t
          ),
        })),

      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      moveTask: (taskId, direction) => {
        const { tasks, columns } = get();
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        const idx = columns.findIndex((c) => c.id === task.columnId);
        if (idx === -1) return;

        const target = direction === 'left' ? idx - 1 : idx + 1;
        if (target < 0 || target >= columns.length) return;

        set({
          tasks: tasks.map((t) =>
            t.id === taskId ? { ...t, columnId: columns[target].id } : t
          ),
        });
      },
    }),
    {
      name: 'kanban-board-storage',
      version: 1,
    }
  )
);
