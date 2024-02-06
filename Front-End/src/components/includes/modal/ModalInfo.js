const ModalInfo = ({data}) => {
    const {titleText = "", descText = "", buttonOptions = []} = data;

    //Service Info
    return ( 
        <div id="transparentmodal-serviceinfo" className="transparent-bg flex-column w-100">
            <div className="modal-box d-flex flex-column justify-content-evenly align-items-center px-4 pt-2">
                <div className="title-modal-white space-modal-title">{titleText}</div>
                <div className="separate-modal-line"></div>
                <div id="modal-info" className="modal-desc">{descText}</div>
            </div>
            <div className="modal-btns-box d-flex flex-column justify-content-around">
                <button id="btn-close-modal" onClick={buttonOptions[0].buttonAction} className="button-wide button-outline-clr space-btn-close border-0">{buttonOptions[0].text}</button>
            </div>
        </div>
     );
}
 
export default ModalInfo;