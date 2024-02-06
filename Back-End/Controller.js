const { default: axios } = require('axios');
const utilFunctions = require('./util');
var qmaticApiUrl = "http://epgqsys-1.norwayeast.cloudapp.azure.com:9090";
var qmaticMobileUrl = "http://epgqsys-1.norwayeast.cloudapp.azure.com:81";
const apiAuthToken = 'c7a1331a-32d-11e5-bf7f-feff819acdc9f';
const mobileAuthToken = 'd0516eee-a32d-11e5-bf7f-feff819cdc9f';
const mobileEntryPointId =1

exports.welcome = async (req,res) => {
  return res.send('welcome');
}
exports.listServices = async (req,res) => {
try {
        let getServiceConfig = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${qmaticApiUrl}/rest/entrypoint/branches/${utilFunctions.branchId}/services`,
          headers: {
            'auth-token': apiAuthToken
          }
        };

      var serviceList = await axios.request(getServiceConfig);

      return res.send(serviceList.data);
  } catch (error) {
      console.log('error', error)
      return res.status(500).send(JSON.stringify(error))
  }
}
exports.getAppointment = async (req,res) => {
  let phoneNumber = req.params.id

  try {
    let getAppointmentConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${qmaticApiUrl}/rest/appointment/appointments/search?/rest/appointment/appointments/search?branchId=4&fromDate=2024-01-28&toDate=2024-02-01`,
      //url: `${qmaticApiUrl}/rest/appointment/appointments/search?branchId=${utilFunctions.branchId}&fromDate=${utilFunctions.getCurrentDate()}&toDate=${utilFunctions.getNextDayDate()}`,
      headers: {
        'auth-token': apiAuthToken
      }
    };

  let appointmentList = await axios.request(getAppointmentConfig);
  let filteredAppointments = utilFunctions.filterAppointmentsByPhone(appointmentList.data , phoneNumber)
  return res.send(filteredAppointments);
} catch (error) {
  console.log('error', error)
  return res.status(500).send(JSON.stringify(error))
}
}
exports.checkInAppointment = async (req,res) => {
  let appointmentId = req.query.appointmentId
  let branchId = req.query.branchId
  let data = JSON.stringify({
    appointmentId : appointmentId,
    "parameters": {
      branchId : branchId
    }
  });
  console.log(data)
    try {
      let visitCreateConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/rest/entrypoint/branches/4/entryPoints/${mobileEntryPointId}/visits`,
        headers: {
          'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/',
          'Content-Type': 'application/json',
          'auth-token': apiAuthToken
        },
        data : data
      };

    var visitCreate = await axios.request(visitCreateConfig);
    return res.send(visitCreate.data);
    } catch (error) {
    console.log('error', error)
    return res.status(500).send(JSON.stringify(error))
    }
    // res.status(200).send("done")
}
exports.createCustomer = async (req, res) => {
  try {
          let data = req.body
          let visitCreateConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/rest/entrypoint/branches/4/entryPoints/${mobileEntryPointId}/visits`,
            headers: {
              'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/',
              'Content-Type': 'application/json',
              'auth-token': apiAuthToken
            },
            data : data
          };
        var visitCreate = await axios.request(visitCreateConfig);
        return res.send(visitCreate.data);
    } catch (error) {
        console.log('error', error)
        return res.status(500).send(JSON.stringify(error))
    }
}

exports.createTicket = async (req,res) => {
  try {

        let data = req.body
        console.log(data)
          let visitCreateConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/rest/entrypoint/branches/4/entryPoints/${mobileEntryPointId}/visits`,
            headers: {
              'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/',
              'Content-Type': 'application/json',
              'auth-token': apiAuthToken
            },
            data : data
          };

        var visitCreate = await axios.request(visitCreateConfig);
        return res.send(visitCreate.data);

    } catch (error) {
        console.log('error', error)
        return res.status(500).send(JSON.stringify(error))
    }
}

exports.getMettingLink = async (req,re) => {
  try {
    let getMeetingConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${qmaticMobileUrl}/MobileTicket/MyMeeting/branches/${branchId}/visits/${visitId}`,
       headers: {
        'auth-token': mobileAuthToken
      }
    };

  let meetingLink = await axios.request(getMeetingConfig);

  return res.send(meetingLink.data);
} catch (error) {
  console.log('error', error)
  return res.status(500).send(JSON.stringify(error))
}
}

exports.currentVisit = async (req,res) => {
    const query = req.query;
    let visitsconfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${qmaticApiUrl}/MobileTicket/MyVisit/CurrentStatus/branches/${query.branchId}/visits/${query.visitId}?checksum=${query.checksum}`,
        headers: {
            'auth-token': mobileAuthToken
        }
    };

    try {
        var visits = await axios.request(visitsconfig);

        return res.send(visits.data);
    } catch (error) {

        res.status(500).send("error");
    }
}
exports.sendOTP = async (req,res) => {
  let customerData = req.body
  console.log(customerData)
  let otpValue = generateOTP()
  try {
    let variableResponse = await putOTPIntoVarables(customerData,otpValue)
    let messageResponse = await sendOTPMessage(customerData.phoneNumber, otpValue)
    res.status("201").send({
      message : "accepted"
    })
  } catch (error) {
    res.status(500).send("error");
  }
}
exports.validateOTP = async (req,res) => {
  let customerData = req.body
  try {
    let variableResponse = await getOTPFromVariableAndValidate(customerData)
    if(variableResponse == "sucess"){
      res.status(202).send({
        message : "sucess"
      })
    }else {
      res.status(401).send({
        message : "fail"
      })
    }

  } catch (error) {
    res.status(401).send({
      message : "fail"
    })
  }
}

function generateOTP() {
  const min = 1000;
const max = 9999;
const random4DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
return random4DigitNumber
}

function sendOTPMessage(phoneNumber , otp) {
  try {
    let smsBody = {
      "apiver": "1.0",
        "sms": {
        "ver": "2.0",
          "dlr": {
          "url": ""
        },
        "messages": [{
          "udh": "0",
          "text": `Your OTP is ${otp}. It is valid for 2 minutes. Please do not share this OTP with anyone.`,
          "property": 0,
          "id": "1",
          "addresses": [{
            "from": "NAKHEEL",
            "to": phoneNumber,
            "seq": "1",
            "tag": "Nakheel"
          }]
        }]
      }
    }
     let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://meapi.goinfinito.me/unified/v2/send`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJbmZpbml0byIsImlhdCI6MTY3NDExMTUzMiwic3ViIjoibmFraGVlbGluZmluaXRvZTdiYmUzdnc2In0.QcZUC9bNSEbSgf0nf0X-N3g_Ex4GehCX9NjzAf0soS4"
      },
      data : smsBody
     }
     let response = axios.request(config)
     return response.data
  } catch (error) {
    console.log(error)
  }

}

async function  putOTPIntoVarables(customerData,otpValue) {
  let body = {
    name : "OTP-"+customerData.phoneNumber,
    value : otpValue
  }
  console.log(body)
  let visitsconfig = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${qmaticApiUrl}/rest/entrypoint/branches/${utilFunctions.branchId}/variables`,
      headers: {
        'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/',
        'Content-Type': 'application/json',
        'auth-token': apiAuthToken
      },
      data : body
  };

  try {
      var visits = await axios.request(visitsconfig);

      return visits
  } catch (error) {

      return "fail"
  }
}
async function getOTPFromVariableAndValidate(customerData) {
  let variableDataConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${qmaticApiUrl}/rest/entrypoint/branches/${utilFunctions.branchId}/variables/${"OTP-" + customerData.phoneNumber}`,
    headers: {
      'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/',
      'Content-Type': 'application/json',
      'auth-token': apiAuthToken
    },
    };

try {
    var variableData = await axios.request(variableDataConfig);
    if(variableData.data.value == customerData.otp){
      deleteOTPFromVariable(customerData)
      return "sucess"
    }else {
      return "wrong otp entered"
    }

} catch (error) {

    return "wrong otp entered"
}
}
async function deleteOTPFromVariable(customerData){
  let variableDataConfig = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${qmaticApiUrl}/rest/entrypoint/branches/${utilFunctions.branchId}/variables/${"OTP-" + customerData.phoneNumber}`,
    headers: {
      'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:9090/',
      'Content-Type': 'application/json',
      'auth-token': apiAuthToken
    },
    };

try {
    var variableData = await axios.request(variableDataConfig);

    return variableData.data;
} catch (error) {

    return "fail"
}
}

exports.listQueues = async (req,res) => {
    try {
        let data = '';
        const {serviceId} = req.query;
        console.log('serviceId', serviceId)

        let listQueueConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://epgqsys-1.norwayeast.cloudapp.azure.com:8080/rest/servicepoint/branches/8/queues',
        headers: {
            'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:8080/',
            'Authorization': 'Basic c3VwZXJhZG1pbjpJbmZyQGMwbTIz',
        },
        data : data
        };

          var result = await axios.request(listQueueConfig) ;
        //   console.log('result', result.data)
          return res.send(result.data)
    } catch (error) {
        console.log('error', error)
        return res.status(500).send(JSON.stringify(error))
    }
}

// exports.deleteTicket = async (req,res) => {
//     try {
//         const {visitId, branchId, checksum} = req.query;
//         console.log('query params: ', req.query)

//         let delTicketConfig = {
//         method: 'delete',
//         maxBodyLength: Infinity,
//         url: `http://epgqsys-1.norwayeast.cloudapp.azure.com:8080/rest/entrypoint/branches/8/visits/${visitId}/`,
//         headers: {
//             'Referer': 'http://epgqsys-1.norwayeast.cloudapp.azure.com:8080/',
//             'Authorization': 'Basic c3VwZXJhZG1pbjpJbmZyQGMwbTIz',
//         },
//         };

//           var result = await axios.request(delTicketConfig) ;
//           console.log('result', result.data)
//           return res.send(result.data)
//     } catch (error) {
//         console.log('error', error)
//         return res.status(500).send(JSON.stringify(error))
//     }
// }

// http://localhost:9090/MobileTicket/MyVisit/branches/${branchId}/ticket/${visitId}?checksum=${checksum}`
// http://localhost:9090/MobileTicket/MyVisit/branches/6/ticket/${visitId}?checksum=${checksum}`
//http://localhost:8080/rest/servicepoint/branches/6/servicePoints/4/visits/1427