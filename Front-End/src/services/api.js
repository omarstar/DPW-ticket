import axios from "axios";

const apiUrls = {
    sendOtp:  process.env.REACT_APP_API_URL+'/rest/mobile/sendotp',
    validateOtp:  process.env.REACT_APP_API_URL + '/rest/mobile/validateotp',
    visitStatus: process.env.REACT_APP_API_URL + '/rest/mobile/visit/status'
}

export const callValidateOtp = async(reqData) => {
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