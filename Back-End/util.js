 let branchId = 4

 function getNextDayDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

   function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function filterAppointmentsByPhone(appointmentList, phone) {
    let filteredAppointments = [];

    for (let i = 0; i < appointmentList.length; i++) {
      const appointment = appointmentList[i];
      const customerPhone = appointment.customers[0].properties.phoneNumber;
      if(appointment.status == "CREATED"){
      // Check if either the customer's phone or the provided phone is greater than 10 characters
      if (customerPhone.length > 9 || phone.length > 9) {
        // Slice the last 9 digits if the length is greater than 10
        const slicedCustomerPhone = customerPhone.slice(-9);
        const slicedPhone = phone.slice(-9);

        // Check if the sliced customer's phone matches the sliced provided phone
        if (slicedCustomerPhone === slicedPhone) {
          filteredAppointments.push(appointment);
        }
      } else {
        // If both phone numbers are less than or equal to 10 characters, perform a direct comparison
        if (customerPhone === phone) {
          filteredAppointments.push(appointment);
        }
      }
    }
    }

    return filteredAppointments;
  }




  module.exports = {
    getCurrentDate,
    getNextDayDate,
    filterAppointmentsByPhone,
    branchId
  };