import { useState, useEffect } from 'react';
import { Task } from '../types';

interface UseCreateEditTaskProps {
  task?: Task;
}

const useCreateEditTask = ({ task }: UseCreateEditTaskProps) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setPriority(task.priority);
    } else {
      setName('');
      setPriority('medium');
    }
  }, [task]);

  const resetForm = () => {
    setName('');
    setPriority('medium');
  };

  return {
    name,
    priority,
    setName,
    setPriority,
    resetForm,
  };
};

export default useCreateEditTask;
