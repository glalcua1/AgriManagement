import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  currentPage: string;
  theme: 'light' | 'dark';
  notifications: Notification[];
  loading: {
    global: boolean;
    farms: boolean;
    leases: boolean;
    payments: boolean;
    weather: boolean;
  };
  dialogs: {
    addFarm: boolean;
    addLease: boolean;
    addExpense: boolean;
    confirmDelete: boolean;
    farmDetails: boolean;
    leaseDetails: boolean;
  };
  alerts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  selectedEntityId: string | null;
  selectedEntityType: 'farm' | 'lease' | 'expense' | 'payment' | null;
}

const initialState: UIState = {
  sidebarOpen: true,
  currentPage: 'dashboard',
  theme: 'light',
  notifications: [],
  loading: {
    global: false,
    farms: false,
    leases: false,
    payments: false,
    weather: false,
  },
  dialogs: {
    addFarm: false,
    addLease: false,
    addExpense: false,
    confirmDelete: false,
    farmDetails: false,
    leaseDetails: false,
  },
  alerts: [],
  selectedEntityId: null,
  selectedEntityType: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    openDialog: (state, action: PayloadAction<keyof UIState['dialogs']>) => {
      state.dialogs[action.payload] = true;
    },
    closeDialog: (state, action: PayloadAction<keyof UIState['dialogs']>) => {
      state.dialogs[action.payload] = false;
    },
    closeAllDialogs: (state) => {
      Object.keys(state.dialogs).forEach(key => {
        state.dialogs[key as keyof UIState['dialogs']] = false;
      });
    },
    showAlert: (state, action: PayloadAction<Omit<UIState['alerts'][0], 'id'>>) => {
      const alert = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      };
      state.alerts.push(alert);
    },
    hideAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
    },
    setSelectedEntity: (state, action: PayloadAction<{ id: string | null; type: UIState['selectedEntityType'] }>) => {
      state.selectedEntityId = action.payload.id;
      state.selectedEntityType = action.payload.type;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setCurrentPage,
  setTheme,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearAllNotifications,
  setLoading,
  openDialog,
  closeDialog,
  closeAllDialogs,
  showAlert,
  hideAlert,
  clearAllAlerts,
  setSelectedEntity,
} = uiSlice.actions;

export default uiSlice.reducer; 