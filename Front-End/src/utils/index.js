// import Text from "../components/Text";
import { getLocalTranslate } from "./language";

export function api(endpoint) {
    return process.env.REACT_APP_API_URL + endpoint;
}

export function randomStr(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function validateEmptyField(inputValue) {
  console.log('inputValue', inputValue)
  return inputValue !== "";
}

export  const validateEmail = (email) => {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const validateInput = (input, errorElement, validationFunction,lang) => {
  // input.attr("name") 
      console.log('validationFunction',validationFunction);
  var value = input.val();
  var isValid = validationFunction(value);

  if (!isValid) {
    if(value === "")
    errorElement.text(getLocalTranslate("alertEmptyField",lang));
    // errorElement.text("This field is required");
    else {
      errorElement.text(getLocalTranslate("alertInvalidFormat",lang));
    }	
    errorElement.css('visibility', 'visible');
    return false;
  } else {
    errorElement.text("");
    errorElement.css('visibility', 'hidden');
    return true;
  }
}

export function vadidateForm($,currentSection) {
  var requires = currentSection.find('.required');
  var emails = currentSection.find('.email');
  var errors = 0;
  if(requires.length){
      requires.each(function(){
          if(!$(this).val()){$(this).addClass('error-input');errors++;}
          if($(this).attr('type')==="radio"){
              var inputName = $(this).attr("name");
              if($('input[name="'+inputName+'"]:checked').length === 0){
                  $(this).addClass('error-input');errors++;
              }
          }
          if($(this).attr('type')==="checkbox"){
              var inputName = $(this).attr("name");
              if($('input[name="'+inputName+'"]:checked').length === 0){
                  $(this).addClass('error-input');errors++;
              }
          }
      })
  }
  if(emails.length){
      emails.each(function(){
          if($(this).val() && !isEmail($(this).val())){$(this).addClass('error-input');errors++;}
      })
  }

  return errors;
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


export const getSessionValue = (sKey, defaultValue='') => {
    const value = localStorage.getItem(sKey);
    return ((value!== null && value !== undefined) ? value : (defaultValue || ""));
}

export const setSessionValue = (sKey, aValue = '') => {
    if(sKey){
        localStorage.setItem(sKey, aValue)
        console.log(`${sKey} saved: `,aValue);
    }
}

export const clearASession = (sKey) => {
    localStorage.removeItem(sKey)
}
  
 
export const clearAllSession = () => {
    localStorage.clear();
}

export const vop = (value) => {
    console.log('value', value)
    const messageA = value?.message ? value.message.split("@") : ""
    
      return (messageA[0] === process.env.REACT_APP_OTP_KEY
      && messageA[1] === process.env.REACT_APP_OTP_VALUE
      && value?.status === 90001)
  }


  export const checkArrivalTime = (targetTime) => {
    var remaining_min  = calculateRemainingTime2(targetTime);
    console.log('remaining_min',remaining_min);
    var earlyOrLate = "";
    
    if (remaining_min>14) {
      earlyOrLate = "remaining";
    } 
    else if (remaining_min<-30) {
      earlyOrLate = "overdue"
    } 
    else {
      earlyOrLate = "open";
    }
    return earlyOrLate;
  }

  export const getCurrentTime = ()  =>{
    var date = new Date();
    var hours = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();
    
    // Add leading zeros if needed
    if (hours.length < 2) {
      hours = "0" + hours;
    }
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    
    return hours + ":" + minutes + ":" + "00";
  }


export const parseAppointmentTime = (appointmentTime) => {
const months = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
};

const dateTimeParts = appointmentTime.split(" ");
const dateStr = dateTimeParts[0];
const timeStr = dateTimeParts[1];

const dateParts = dateStr.split("/");
const day = parseInt(dateParts[0], 10);
const month = months[dateParts[1].toUpperCase()];
const year = parseInt(dateParts[2], 10);

const timeParts = timeStr.split(":");
const hours = parseInt(timeParts[0], 10);
const minutes = parseInt(timeParts[1], 10);
const seconds = parseInt(timeParts[2], 10);

return new Date(year, month, day, hours, minutes, seconds);
}

export const calculateRemainingTime = (dateString) => {
var targetDate = new Date(dateString);

var currentDate = new Date();
console.log('targetDate',targetDate,currentDate);
// Calculate the time difference in milliseconds
var timeDifference = targetDate.getTime() - currentDate.getTime();
console.log('timeDifference',timeDifference,targetDate,currentDate);
// Calculate remaining hours, minutes, and seconds
var remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
var remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
var remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
if(remainingHours<0){
    remainingHours = remainingHours + 1;
}
return remainingHours + " hr : " + Math.abs(remainingMinutes) + " min";
}

export const calculateRemainingTime2 = (dateString) => {
var targetDate = new Date(dateString);

var currentDate = new Date();
console.log('targetDate',targetDate,currentDate);
// Calculate the time difference in milliseconds
var timeDifference = targetDate.getTime() - currentDate.getTime();
console.log('timeDifference',timeDifference,targetDate,currentDate);
// Calculate remaining hours, minutes, and seconds
var remainingHours = Math.floor(timeDifference / (1000 * 60 * 60)) +1;
var remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
var remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

return remainingHours+remainingMinutes;
}

export const formatDate = (dateString) => {
// var dateString = "2024-01-12T08:30:00.000+0000";
var dateObject = new Date(dateString);

var options = {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
hour12: true
};

var formattedDate = dateObject.toLocaleDateString('en-US', options);

return formattedDate;
}