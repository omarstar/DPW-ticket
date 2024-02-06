import axios from "axios";

const apiUrls = {
    sendOtp:  process.env.REACT_APP_API_URL+'/rest/mobile/sendotp',
    validateOtp:  process.env.REACT_APP_API_URL + '/rest/mobile/validateotp',
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