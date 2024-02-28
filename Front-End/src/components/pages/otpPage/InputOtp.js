import React, { useEffect, useRef } from 'react';
import './input.css';

function InputOtp({otpValue, onOtpChange, onKeyClick}) {

  const inputRefs = useRef(Array.from({ length: 4 }).map(() => React.createRef()));

    const handleOtpChange = (event, index) => {
        const { value } = event.target;
        const digits = value.replace(/\D/g, '');
    
        return onOtpChange((prevOtp) => {
            const updatedOtp = [...prevOtp];
            updatedOtp[index] = digits;
            console.log("=======>>>>>>>>>>>>>>>>>>>>>===========>", updatedOtp) 
            if(digits.length === 1 && index < 3){
                const nextInput = event.target.nextSibling;
                if(nextInput)
                  nextInput.focus();
            }
            if(updatedOtp.length === 4) {
              onKeyClick()
            }
            return updatedOtp;
        })
      };

    const handleKeyDown = (event, index) => {
      if(event.key === 'Enter'){
        onKeyClick();
      } else if (event.key === 'Backspace' && !otpValue[index] && index > 0) {
        // Move focus to the previous input on Backspace press
        inputRefs.current[index - 1].current.focus();
        otpValue.pop();
        
        // console.log('otpValue', otpValue)
      }
      if (otpValue.length > 0 && otpValue[otpValue.length -1] === ''){
        otpValue.pop();
        // console.log('otpValue bk', otpValue[otpValue.length -1],otpValue.length)
      }
    };

    useEffect(() => {
      // Focus on the first input after the first render
      inputRefs.current[0].current.focus();
    }, []);

    return (
        <div className="otp-set-box h-10">
          <div className="otp-dashes">
          {Array.from({ length: 4 }, (_, index) => (
            <input
            key={index}
            ref={inputRefs.current[index]}
            type="text"
            className="otp-num-input"
            maxLength="1"
            pattern="\d*"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={otpValue[index] || ''}
            onChange={(event)=>handleOtpChange(event,index)}
            onKeyDown={(event)=> handleKeyDown(event, index)}
          />
          ))}
          </div>
        </div>
    );
}

export default InputOtp;