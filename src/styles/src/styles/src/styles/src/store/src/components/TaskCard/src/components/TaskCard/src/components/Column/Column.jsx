import { FaPlus, FaTrash } from 'react-icons/fa';
import TaskCard from '../TaskCard/TaskCard';
import styles from './Column.module.scss';

export default function Column({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDeleteColumn,
}) {
  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h3 className={styles.title}>{column.title}</h3>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            title="Добавить задачу"
            aria-label="Добавить задачу"
            onClick={() => onAddTask(column.id)}
          >
            <FaPlus />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.danger}`}
            title="Удалить колонку"
            aria-label="Удалить колонку"
            onClick={() => onDeleteColumn(column.id)}
          >
            <FaTrash />
          </button>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onMove={onMoveTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className={styles.empty}>Нет задач</p>
        )}
      </div>
    </section>
  );
}
