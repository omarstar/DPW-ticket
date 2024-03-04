import axios from "axios";
const APPURL = process.env.REACT_APP_API_URL??"";
const apiUrls = {
    sendOTP:  'https://epgqsys-1.norwayeast.cloudapp.azure.com:3010'+'/rest/mobile/sendotp',
    validateOtp:  APPURL + '/rest/mobile/validateotp',
    createCustomer:  APPURL + '/rest/mobile/createCustomer',
    visitStatus: APPURL + '/rest/mobile/visit/status',
    golobalVariables: APPURL + '/rest/mobile/golobalVariables',
    getAppointments: APPURL + '/rest/mobile/appointment/id/',
    getOneAppointment: APPURL + '/rest/mobile/appointment/one/'
}

export const ValidateOtp = async(reqData) => {
    const {phoneNumber, otp = ''} = reqData;
    const customerData = {
        phoneNumber,
        otp,
    }
    console.log('coming ', reqData)

    try {
        const response = await axios.post(apiUrls['validateOtp'], customerData)
        console.log('rs: validate ', response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}

export const getTicket = async ({branchId = 4, visitId = 0, checksum = ''}) => {
    try {
        console.log(apiUrls['visitStatus']);
        const url = apiUrls['visitStatus'] + `?branchId=${branchId}&visitId=${visitId}&checksum=${checksum}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            };

            let ticketStatus = await axios.request(config);

        console.log('visit status result: ',ticketStatus.data);
        return ticketStatus.data;

        
    } catch (error) {
        console.error(error);
        throw error;        

    }
};

export const createCustomer = async (customerInfo) => {

    let config = {
        method: 'post',
        url: `${apiUrls['createCustomer']}`,
        headers: { 
            "Content-Type":"application/json"
        },
        data : customerInfo
    };
    
    const response = await axios.request(config);
    return response.data
}

export const sendOTP = async(number,email) => {
    const customerData = {
        phoneNumber : number,
        email : email,
    }
    try {
        const response = await axios.post(apiUrls['sendOTP'], customerData)
        console.log('rs: validate ', response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}


export const golobalVariables = async (name) => {
    try {
        const url = apiUrls['golobalVariables'] + `/${name}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            };
        let getApnt = await axios.request(config);
        console.log('result: ',getApnt.data);
        return getApnt.data;
    } catch (error) {
        console.error(error);
        throw error;        

    }
};

export const getAppointments = async (phoneNum) => {
    try {
        const url = apiUrls['getAppointments'] + `${phoneNum}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            };
        let getApnt = await axios.request(config);
        console.log('result: ',getApnt.data);
        return getApnt.data;
    } catch (error) {
        console.error(error);
        throw error;        

    }
};

export const getOneAppointment = async (publicAppId) => {
    try {
        const url = apiUrls['getOneAppointment'] + `${publicAppId}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            };

        let getApnt = await axios.request(config);
        console.log('getApnt in front', getApnt)
        return getApnt.data;

    } catch (error) {
        console.error(error);
        throw error;        
    }
};