import axios from "axios";

const ApiBackend = process.env.REACT_APP_API_URL;
export const createCustomer = async (customerInfo) => {

    var customerData = "{" + "\"" + "firstName\":" + "\"" + customerInfo.firstName + "\"" +
    ", \"lastName\":" + "\"" + customerInfo.lastName + "\"" + ", \"cardNumber\":" + "\"" +customerInfo.phoneNum + "\"" +
    ",\"properties\":{" +
    "\"phoneMobile\":" + "\"" + customerInfo.phoneNum + "\"" +", \"phoneNumber\":"+"\""+customerInfo.phoneNum+"\""+", \"email\":"+"\""+customerInfo.email+"\""+", \"company\":"+"\""+customerInfo.company+"\""+
    "}}";

    let config = {
        method: 'post',
        url: `${ApiBackend}/rest/mobile/createCustomer`,
        headers: { 
            "Content-Type":"application/json"
        },
        data : customerInfo
    };
    
    const response = await axios.request(config);
}