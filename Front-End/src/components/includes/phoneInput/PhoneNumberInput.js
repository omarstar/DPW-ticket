import React, { useEffect, useRef } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import './phoneInput.css'
import { setPhonenumber } from '../../../reducers';
import { useDispatch } from 'react-redux';

const PhoneNumberInput = () => {

  const phoneInputField = useRef(null);

  const dispatch = useDispatch();
  // const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {

    const loadIntlTelInputUtils = async () => {
      try {
        const { loadUtils } = await import('intl-tel-input/build/js/utils');
        return loadUtils;
      } catch (error) {
        console.error('Error loading intl-tel-input utils:', error);
      }
    };

    const initializePhoneNumberInput = async () => {
      const loadUtils = await loadIntlTelInputUtils();
      console.log('loadUtils', loadUtils)//undefined!

      // if (loadUtils) {
        const phoneInput = intlTelInput(phoneInputField.current, {
          preferredCountries: ['ae'],
          separateDialCode: true,
          customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) => {
            return '5xxxxxxxx';
          },
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
        });

        phoneInputField.current.addEventListener('input', () => {
          const phoneNumber = phoneInput.getNumber();
          console.log('mobile number', phoneNumber);
          dispatch(setPhonenumber(phoneNumber));
        });

        return () => {
          // Cleanup code if necessary
          phoneInput.destroy();
        };
      // }
    };
    initializePhoneNumberInput();
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
    </div>
  );
};

export default PhoneNumberInput;
