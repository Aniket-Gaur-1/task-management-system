'use client';

import { Task } from '../types/task';
import styles from '../styles/taskItem.module.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  return (
    <div className={`${styles.taskItem} ${styles[task.status]}`}>
      <div className={styles.content}>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <span className={styles.status}>{task.status}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onToggle(task.id)} className={styles.toggleBtn}>
          {task.status === 'completed' ? '↩ Undo' : '✓ Complete'}
        </button>
        <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}
