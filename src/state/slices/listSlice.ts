import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskList } from '../../types';

interface ListEditState {
  isEditing: boolean;
  editName: string;
}

interface ListState {
  lists: TaskList[];
  edits: {
    [listId: string]: ListEditState;
  };
}

const initialState: ListState = {
  lists: [{ id: 'list-1', name: 'Default' }],
  edits: {},
};

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<TaskList>) {
      state.lists.push(action.payload);
    },
    deleteList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
      delete state.edits[action.payload];
    },
    reorderTaskLists(
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.lists.splice(sourceIndex, 1);
      state.lists.splice(destinationIndex, 0, removed);
    },

    //  Toggle isEditing
    setEditing(state, action: PayloadAction<{ listId: string; isEditing: boolean }>) {
      const { listId, isEditing } = action.payload;
      if (!state.edits[listId]) {
        state.edits[listId] = { isEditing: false, editName: '' };
      }
      state.edits[listId].isEditing = isEditing;
    },

    //  Update the draft "editName"
    setEditName(state, action: PayloadAction<{ listId: string; editName: string }>) {
      const { listId, editName } = action.payload;
      if (!state.edits[listId]) {
        state.edits[listId] = { isEditing: false, editName: '' };
      }
      state.edits[listId].editName = editName;
    },

    //  Apply the edited name to the actual list
    applyListName(state, action: PayloadAction<{ listId: string }>) {
      const { listId } = action.payload;
      const editState = state.edits[listId];
      if (!editState) return;

      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        list.name = editState.editName.trim() || list.name;
      }
      // Turn off editing
      editState.isEditing = false;
    },
  },
});

export const { addList, setEditing, setEditName, applyListName, deleteList, reorderTaskLists } =
  listSlice.actions;
export default listSlice.reducer;
