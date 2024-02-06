

const ModalExit = ({data}) => {

    const {titleText = "", buttonOptions = []} = data;

    return ( 
        <div id="transparentmodal-exithome" className="transparent-bg flex-column w-100">
            <div className="modal-box d-flex flex-column justify-content-center align-items-center px-4 pt-2">
                <div className="title-modal-white space-modal-title">{titleText}</div>
            </div>
            <div className="modal-btns-box d-flex flex-column justify-content-around">
                <button id="btn-yes-modal" onClick={buttonOptions[0].buttonAction} className="button-wide button-outline-clr space-btnmodal-yes border-0">{buttonOptions[0].text}</button>
                <button id="btn-no-modal"  onClick={buttonOptions[1].buttonAction} className="button-wide button-outline-clr  space-btnmodal-no border-0">{buttonOptions[1].text}</button>
            </div>
        </div>        
     );
}
 
export default ModalExit;