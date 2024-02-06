import { createSlice } from '@reduxjs/toolkit'




const initialState = {
   appointments: null,
}

export const AppointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state,action) => {
      state.appointments = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAppointments } = AppointmentSlice.actions



export default AppointmentSlice