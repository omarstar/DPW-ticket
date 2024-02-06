import { createSlice } from '@reduxjs/toolkit'

const getLocalTicketData = () => {
  return localStorage.getItem("ticket") ? JSON.parse(localStorage.getItem("ticket")) : {};
}
const getbranchIdData = () => {
  return localStorage.getItem("branchid") ? JSON.parse(localStorage.getItem("branchid")) : {};
}


const initialState = {
  branches: null,
  services: null,
  ticket: getLocalTicketData,
  splash: true,
  loading: true,
  thankyou: false,
  modal: false,
  // infoModal: false,
  CurrentLang: 'en',
  phoneNumber: '',
  branchid: getbranchIdData
}

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setServices: (state,action) => {
      state.services = action.payload
    },
    setBranches: (state,action) => {
      state.branches = action.payload
      localStorage.setItem("branch",JSON.stringify(state.cartItems));
    },
   
    setTicket: (state,action) => {
        state.ticket = action.payload
        localStorage.setItem("ticket",JSON.stringify(state.cartItems));
      },
    setLoading: (state,action) => {
      state.loading = action.payload
    },
    setSplash: (state,action) => {
      state.splash = action.payload
    },
    setThankyou: (state,action) => {
      state.thankyou = action.payload
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setBranchid: (state, action) => {
      state.branchid = action.payload
    },
    setPhonenumber: (state, action) => {
      state.branchid = action.payload
    },
    toggleCurrentLang: (state, action) => {
      state.CurrentLang = state.CurrentLang === 'ar' ? 'en' : 'ar'
    }
  },
})

// Action creators are generated for each case reducer function
export const { setServices, setBranches , setLoading ,setBranchid, setPhonenumber, setThankyou, setTicket, setSplash, setModal, toggleCurrentLang } = counterSlice.actions
// selectors
export const selectLanguage = (state) => {
  console.log('state.app.currentLang', state.app.CurrentLang)
  return state.app.CurrentLang
}
export const isShowModal = (state) => {
  return state.app.modal;
}
export const getPhonenumber = (state) => {
  return state.app.phoneNumber;
}

export default counterSlice