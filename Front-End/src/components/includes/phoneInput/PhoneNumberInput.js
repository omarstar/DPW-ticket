import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle  } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import './phoneInput.css'
import { setPhonenumber } from '../../../reducers';
import { useDispatch } from 'react-redux';

const PhoneNumberInput = forwardRef(({onValidationResult}, ref) => {
  
  const phoneInputField = useRef(null);
  const phoneInputInitialized = useRef(false);

  const [phoneInput, setPhoneInput] = useState(null);

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

    // Expose a method to check if the input is empty
    const isInputEmpty = () => {
      return phoneInput && phoneInput.getNumber().trim() === '';
    };
  
    // Expose a method to check if the input is a valid number
    const isValidNumber = () => {
      return phoneInput && phoneInput.isValidNumber();
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
             const phoneInputInstance = intlTelInput(phoneInputField.current, {
            preferredCountries: ['ae'],
            separateDialCode: true,
            customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) => {
              return '5xxxxxxxx';
            },
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
          });

          setPhoneInput(phoneInputInstance);
  
          phoneInputField.current.addEventListener('input', () => {
            // const phoneNumber = phoneInputInstance.getNumber();
            // dispatch(setPhonenumber(phoneNumber));
          });
  
          phoneInputField.current.addEventListener('blur', ()=>{
            validateMobileInput(phoneInputInstance);
          });
          
          phoneInputField.current.addEventListener('keydown', (e)=>{
            if(e.key === "Enter" || e.key === 'Go'){
              validateMobileInput(phoneInputInstance);
            }
          });

          phoneInputInitialized.current = true;
  
          return () => {
            // Cleanup code if necessary
            phoneInputInstance.destroy();
          };
        }
      }


    };

    initializePhoneNumberInput();

  }, []);

  useImperativeHandle(ref, () => ({
    isInputEmpty,
    isValidNumber,
  }));

  return (
    <div className="input-block">
      <input
        id="phonenumber"
        ref={phoneInputField}
        type="tel"
        maxlength="15"
        className='input-box input-mobile-box input-fullwidth required'
        name="phone"
      />
    </div>
  );
});

export default PhoneNumberInput;
