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