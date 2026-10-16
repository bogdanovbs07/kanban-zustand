import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useBoardStore } from '../../store/useBoardStore';
import Column from '../Column/Column';
import TaskFormModal from '../TaskFormModal/TaskFormModal';
import styles from './Board.module.scss';

export default function Board() {
  const {
    columns,
    tasks,
    addColumn,
    removeColumn,
    addTask,
    updateTask,
    removeTask,
    moveTask,
  } = useBoardStore();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [presetColumnId, setPresetColumnId] = useState(null);

  const openCreate = (columnId) => {
    setEditingTask(null);
    setPresetColumnId(columnId);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setPresetColumnId(task.columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    setPresetColumnId(null);
  };

  const handleSubmit = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    closeModal();
  };

  const handleAddColumn = () => {
    const title = window.prompt('Название колонки:');
    if (title && title.trim()) addColumn(title.trim());
  };

  const modalInitialTask = editingTask
    ? editingTask
    : presetColumnId
    ? { title: '', description: '', columnId: presetColumnId }
    : null;

  return (
    <div className={styles.board}>
      <header className={styles.header}>
        <h1 className={styles.title}>Канбан-доска</h1>
        <button
          type="button"
          className={styles.addColumn}
          title="Добавить колонку"
          aria-label="Добавить колонку"
          onClick={handleAddColumn}
        >
          <FaPlus /> <span>Колонка</span>
        </button>
      </header>

      <div className={styles.columns}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.columnId === column.id)}
            onAddTask={openCreate}
            onEditTask={openEdit}
            onDeleteTask={removeTask}
            onMoveTask={moveTask}
            onDeleteColumn={removeColumn}
          />
        ))}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        columns={columns}
        initialTask={modalInitialTask}
      />
    </div>
  );
}
