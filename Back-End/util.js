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
      const customerPhone = appointment.customers[0]?.properties?.phoneNumber??"";
      console.log('customerPhone', customerPhone);//test
      console.log('appointment', appointment);//test
      if(appointment.status == "CREATED" && parseInt(customerPhone) == parseInt(phone) && JSON.parse(appointment.properties?.custom??{}).lang=='en'){
        filteredAppointments.push(appointment);
      }
    }

    return filteredAppointments;
  }

  function filterAppointmentByPublicId(app, pId) {
    console.log('app to filter', app)
    console.log('pid to filet', pId)
    const filteredAppointments = app.filter(appointment => appointment.properties && appointment?.properties?.publicId === pId);
    console.log('filteredAppointments', filteredAppointments)
    return filteredAppointments
  }



  module.exports = {
    getCurrentDate,
    getNextDayDate,
    filterAppointmentsByPhone,
    filterAppointmentByPublicId,
    branchId
  };