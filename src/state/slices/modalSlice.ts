import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalData } from '../../types';

interface ModalState {
  modals: {
    [key: string]: {
      isOpen: boolean;
      data?: ModalData;
    };
  };
}

const initialState: ModalState = {
  modals: {},
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{ key: string; data?: ModalData }>) {
      state.modals[action.payload.key] = {
        isOpen: true,
        data: action.payload.data || null,
      };
    },
    closeModal(state, action: PayloadAction<string>) {
      if (state.modals[action.payload]) {
        state.modals[action.payload].isOpen = false;
        state.modals[action.payload].data = null;
      }
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
