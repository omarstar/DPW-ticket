import { createSlice } from '@reduxjs/toolkit'

const getLocalTicketData = () => {
  return localStorage.getItem("ticket") ? JSON.parse(localStorage.getItem("ticket")) : {};
}
const getbranchIdData = () => {
  return localStorage.getItem("branchid") ? JSON.parse(localStorage.getItem("branchid")) : {};
}

const branchesList = ["LOB14","LOB15"]

const initialState = {
  branches: null,
  services: null,
  branchPrefix : null,
  category : null,
  flow: "",
  ticket: getLocalTicketData,
  splash: true,
  loading: true,
  thankyou: false,
  modal: false,
  // infoModal: false,
  CurrentLang: 'en',
  phoneNumber: '',
  customer: '',
  email: '',
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
    },
    setFlow: (state,action) => {
      state.flow = action.payload
    },
   
    setTicket: (state,action) => {
        state.ticket = action.payload

    },
    setBranchPrefix: (state,action) => {
      if(branchesList.some(br=> br === action.payload)){
        state.branchPrefix = action.payload.toUpperCase();
      }else{
        state.branchPrefix = 'LOB14'
      }
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
    setCategory: (state,action) => {
      state.category = action.payload
    },

    setModal: (state, action) => {
      state.modal = action.payload
    },
    setBranchid: (state, action) => {
      state.branchid = action.payload
    },
    setPhonenumber: (state, action) => {
      state.phoneNumber = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setCustomer: (state, action) => {
      state.customer = action.payload
    },

    
    
    toggleCurrentLang: (state, action) => {
      state.CurrentLang = state.CurrentLang === 'ar' ? 'en' : 'ar'
    }
  },
})

// Action creators are generated for each case reducer function
export const { setServices, setBranches , setLoading ,setBranchid, setPhonenumber,setEmail,setCustomer, setThankyou, setTicket, setSplash, setModal, toggleCurrentLang,setFlow,setBranchPrefix,setCategory } = counterSlice.actions
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
export const getCurrentLang = (state) => {
  return state.app.CurrentLang;
}


export default counterSlice