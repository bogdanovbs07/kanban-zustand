import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './TaskCard.module.scss';

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>{task.title}</h4>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            title="Редактировать задачу"
            aria-label="Редактировать задачу"
            onClick={() => onEdit(task)}
          >
            <FaEdit />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.danger}`}
            title="Удалить задачу"
            aria-label="Удалить задачу"
            onClick={() => onDelete(task.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.movers}>
        <button
          type="button"
          className={styles.iconBtn}
          title="Переместить влево"
          aria-label="Переместить задачу влево"
          onClick={() => onMove(task.id, 'left')}
        >
          <FaArrowLeft />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          title="Переместить вправо"
          aria-label="Переместить задачу вправо"
          onClick={() => onMove(task.id, 'right')}
        >
          <FaArrowRight />
        </button>
      </div>
    </article>
  );
}
