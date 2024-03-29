import './App.css';

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Branches from './components/pages/Branches';
import Services from './components/pages/Services';
import PhoneNumber from './components/pages/PhoneNumber';
// import Survey from './components/pages/Survey';
import Ticket from './components/pages/Ticket';
import Thankyou from './components/pages/Thankyou';
import Welcome from './components/pages/Welcome';
import CustomerForm from './components/pages/customerForm/CustomerForm';
// import Otp from './components/pages/otpPage/otp';
import WalkOtp from './components/pages/walkOtpPage/WalkOtp';
import ServiceList from './components/pages/servicesList/ServiceList';
import OptionsPage from './components/pages/OptionsPage';
import TestLayout from './components/testLayout/TestLayout';
import AppointmentList from './components/pages/appointment/AppointmentList';
import BookingSummary from './components/pages/bookingSummary/BookingSummary';
import CategoryList from './components/pages/servicesList/CategoryList';
import TicketRedirect from './components/pages/TicketRedirect';
import WalkinPhoneNumber from './components/pages/WalkinPhoneNumer';
import { useSelector } from 'react-redux';
import Loading from './components/includes/loading/loading';
import VirtualSummary from './components/pages/bookingSummary/VirtualSummary';
import VirtualRedirect from './components/pages/bookingSummary/VirtualRedirect';
import CustOptions from './components/pages/CustOptions';

function App() {
  const {loading} = useSelector((state) => state.app);

  return (
    // <Router>
      <>
      {
        loading && <Loading/>
      }
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/DPW/:branch" element={<Welcome />} />
        {/* <Route 
          path="/"
          element={
            <Layout >
                <Route path="dpw/*" element={<Outlet />} />
            </Layout>
          }
        /> */}
        <Route path="/DPW/options" element={<OptionsPage/>} />
        <Route path="/DPW/customer" element={<CustomerForm/>} />
        <Route path="/DPW/otp" element={<WalkOtp/>} />
        <Route path="/DPW/cust-status" element={<CustOptions/>} />
        <Route path="/DPW/services" element={<ServiceList />} />
        <Route path="/DPW/category" element={<CategoryList />} />
        <Route path="/DPW/appointment" element={<AppointmentList />} />
        <Route path="/DPW/summary" element={<BookingSummary />} />
        <Route path="/DPW/appointmentid" element={<VirtualRedirect />} />
        <Route path="/DPW/virtual-app" element={<VirtualSummary />} />
        <Route path="/DPW/branches" element={<Branches/>} />
        {/* <Route path="/DPW/services/:id" element={<Services/>} /> */}
        <Route path="/DPW/walkin-mobile" element={<WalkinPhoneNumber/>} />
        <Route path="/DPW/mobile" element={<PhoneNumber/>} />
        
        {/* <Route path="/DPW/survey" element={<Survey/>} /> */}
        <Route path="/DPW/ticket" element={<Ticket/>} />
        <Route path="/DPW/redirect" element={<TicketRedirect/>} />
        <Route path="/DPW/thankyou" element={<Thankyou/>} />
        <Route path="/DPW/test" element={<TestLayout/>} />
      </Routes>
      </>
    // </Router>
  );
}
//getstarted, options, customer, otp,

export default App;
