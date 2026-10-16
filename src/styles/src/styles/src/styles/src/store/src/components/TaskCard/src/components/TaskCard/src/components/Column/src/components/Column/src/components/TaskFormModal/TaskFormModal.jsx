import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './TaskFormModal.module.scss';

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  columns,
  initialTask,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setColumnId(initialTask.columnId);
    } else {
      setTitle('');
      setDescription('');
      setColumnId(columns[0]?.id || '');
    }
  }, [isOpen, initialTask, columns]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !columnId) return;
    onSubmit({ title: title.trim(), description: description.trim(), columnId });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <header className={styles.header}>
          <h2 id="task-form-title" className={styles.title}>
            {initialTask ? 'Редактировать задачу' : 'Новая задача'}
          </h2>
          <button
            type="button"
            className={styles.iconBtn}
            title="Закрыть"
            aria-label="Закрыть модальное окно"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Название</span>
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название"
              autoFocus
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Описание</span>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание"
              rows={4}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Колонка</span>
            <select
              className={styles.select}
              value={columnId}
              onChange={(e) => setColumnId(e.target.value)}
              required
            >
              {columns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onClose}
            >
              Отмена
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {initialTask ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
