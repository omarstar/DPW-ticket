import React, { useEffect, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import './phoneInput.css'

const PhoneNumberInput = (dynamicClass) => {
  console.log('dynamicClass', dynamicClass.parent, dynamicClass.child)
  let {parent, child} = dynamicClass;
  parent = "input-block";
  child = "inputbox input-fullwidth"


  const phoneInputField = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const phoneInput = intlTelInput(phoneInputField.current, {
      preferredCountries: ["ae"],
      separateDialCode: true,
      customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return "5xxxxxxxx";
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    phoneInputField.current.addEventListener('countrychange', () => {
      const selectedCountryData = phoneInput.getSelectedCountryData();
      console.log('Country changed:', selectedCountryData);
    });

    phoneInputField.current.addEventListener('input', () => {
      const phoneNumber = phoneInput.getNumber();
      setPhoneNumber(phoneNumber);
    });

    return () => {
      // Cleanup code if necessary
      phoneInput.destroy();
    };
  }, []);

  return (
    <div className="input-block">
      <input
        id="phonenumber"
        ref={phoneInputField}
        type="tel"
        className='input-box input-fullwidth required'
        name="phone"
      />
      {/* <p>Entered Phone Number: {phoneNumber}</p> */}
    </div>
  );
};

export default PhoneNumberInput;
