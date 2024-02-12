import React, { useEffect, useRef } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import './phoneInput.css'
import { setPhonenumber } from '../../../reducers';
import { useDispatch } from 'react-redux';

const PhoneNumberInput = ({onValidationResult}) => {

  const phoneInputField = useRef(null);
  const phoneInputInitialized = useRef(false);

  const validateMobileInput = (pv) => {
    const value = pv.getNumber();

    if (pv.isValidNumber()) {
      dispatch(setPhonenumber(value));
      onValidationResult(true, 'valid'); // Validation succeeded
    } else {
      const errorMessage = value === "" ? 'This field is required' : 'Invalid format';
      onValidationResult(false, errorMessage); // Validation failed
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {

    // let loadUtils = true;

    const loadIntlTelInputUtils = async () => {
      try {
        const loadUtils = await import('intl-tel-input/build/js/utils');
        return loadUtils;
      } catch (error) {
        console.error('Error loading intl-tel-input utils:', error);
      }
    };

    const initializePhoneNumberInput = async () => {
      // loadUtils = loadUtils ? await loadIntlTelInputUtils() : false;
      
      if(!phoneInputInitialized.current){
        const loadUtils = await loadIntlTelInputUtils();
        console.log('loadUtils', loadUtils)//undefined!

        if (phoneInputField.current) {
            const phoneInput = intlTelInput(phoneInputField.current, {
            preferredCountries: ['ae'],
            separateDialCode: true,
            customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) => {
              return '5xxxxxxxx';
            },
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
          });
  
          phoneInputField.current.addEventListener('input', () => {
            // const phoneNumber = phoneInput.getNumber();
            // dispatch(setPhonenumber(phoneNumber));
          });
  
          phoneInputField.current.addEventListener('blur', ()=>{
            validateMobileInput(phoneInput);
          });
  
          phoneInputInitialized.current = true;
  
          return () => {
            // Cleanup code if necessary
            phoneInput.destroy();
          };
        }
      }


    };

    initializePhoneNumberInput();

  }, [phoneInputField]);

  return (
    <div className="input-block">
      <input
        id="phonenumber"
        ref={phoneInputField}
        type="tel"
        className='input-box input-fullwidth required'
        name="phone"
      />
    </div>
  );
};

export default PhoneNumberInput;
