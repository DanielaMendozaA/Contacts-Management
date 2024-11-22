import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../interfaces/contacts/contact.interface';

interface ContactState {
  contacts: IContact[];
  lastUpdated: number | null;
}

const initialState: ContactState = {
  contacts: [],
  lastUpdated: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<IContact[]>) => {
      state.contacts = action.payload;
      state.lastUpdated = Date.now();
    },
    addContact: (state, action: PayloadAction<IContact>) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<string | number>) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    editContact: (state, action: PayloadAction<IContact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    clearContacts: (state) => {
      state.contacts = [];
    },
  },
});

export const { setContacts, addContact, removeContact, editContact, clearContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
