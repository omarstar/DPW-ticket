import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   appointments: null,
   selectedApp: {}
}

export const AppointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state,action) => {
      state.appointments = action.payload
    },
    setSelectedAppointment: (state,action) => {
      state.selectedApp = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAppointments, setSelectedAppointment } = AppointmentSlice.actions

export const getSelectedAppointment = (state) => {
  return state.appointments.selectedApp;
}


export default AppointmentSlice