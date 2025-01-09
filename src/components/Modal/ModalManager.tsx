import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { closeModal } from '../../state/slices/modalSlice';
import { addTask, updateTask, deleteTask } from '../../state/slices/taskSlice';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import CreateEditTaskModal from './CreateEditTaskModal';
import FilterModal from './FilterModal';
import { deleteList } from '../../state/slices/listSlice';

const ModalManager: React.FC = () => {
  const modals = useSelector((state: RootState) => state.modals.modals);
  const dispatch = useDispatch();

  return (
    <>
      {/* Create Task Modal */}
      {modals['createTask']?.isOpen && modals['createTask'].data?.type === 'createTask' && (
        <CreateEditTaskModal
          open={modals['createTask'].isOpen}
          onClose={() => dispatch(closeModal('createTask'))}
          onSave={(task) => {
            dispatch(addTask({ ...task, listId: modals['createTask'].data.listId }));
            dispatch(closeModal('createTask'));
          }}
        />
      )}

      {modals['editTask']?.isOpen && modals['editTask'].data?.type === 'editTask' && (
        <CreateEditTaskModal
          open={modals['editTask'].isOpen}
          onClose={() => dispatch(closeModal('editTask'))}
          onSave={(task) => {
            dispatch(updateTask(task));
            dispatch(closeModal('editTask'));
          }}
          task={modals['editTask'].data.task}
        />
      )}

      {modals['deleteTask']?.isOpen && modals['deleteTask'].data?.type === 'deleteTask' && (
        <ConfirmDeleteModal
          open={modals['deleteTask'].isOpen}
          onClose={() => dispatch(closeModal('deleteTask'))}
          onConfirm={() => {
            dispatch(deleteTask(modals['deleteTask'].data.taskId));
            dispatch(closeModal('deleteTask'));
          }}
        />
      )}

      {modals['filterModal']?.isOpen && modals['filterModal'].data?.type === 'filterModal' && (
        <FilterModal
          open={modals['filterModal'].isOpen}
          listId={modals['filterModal'].data.listId}
          onClose={() => dispatch(closeModal('filterModal'))}
        />
      )}

      {modals['deleteList']?.isOpen && modals['deleteList'].data?.type === 'deleteList' && (
        <ConfirmDeleteModal
          open={modals['deleteList'].isOpen}
          onClose={() => dispatch(closeModal('deleteList'))}
          onConfirm={() => {
            dispatch(deleteList(modals['deleteList'].data.listId));
            dispatch(closeModal('deleteList'));
          }}
        />
      )}
    </>
  );
};

export default ModalManager;
