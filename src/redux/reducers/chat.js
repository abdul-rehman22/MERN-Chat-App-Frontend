import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
  notificationsCount: 0,
  newMessagesAlert: getOrSaveFromLocalStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [{ chatId: "", count: 0 }],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationsCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationsCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
    },
    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  resetNotificationCount,
  setNewMessagesAlert,
  removeNewMessagesAlert,
} = chatSlice.actions;
