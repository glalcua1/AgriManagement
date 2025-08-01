import { createSlice } from '@reduxjs/toolkit';
import { Revenue } from '@/types';

interface RevenueState {
  revenues: Revenue[];
  loading: boolean;
  error: string | null;
}

const initialState: RevenueState = {
  revenues: [],
  loading: false,
  error: null,
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
});

export default revenueSlice.reducer; 