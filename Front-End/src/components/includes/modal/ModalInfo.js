const ModalInfo = ({data}) => {
    const {titleText = "", descText = "", buttonOptions = []} = data;

    //Service Info
    return ( 
        <div id="transparentmodal-serviceinfo" class="transparent-bg flex-column w-100">
            <div class="modal-box d-flex flex-column justify-content-evenly align-items-center px-4 pt-2">
                <div class="title-modal-white space-modal-title">{titleText}</div>
                <div class="separate-modal-line"></div>
                <div id="modal-info" class="modal-desc">{descText}</div>
            </div>
            <div className="modal-btns-box d-flex flex-column justify-content-around">
                <button id="btn-close-modal" onClick={buttonOptions[0].buttonAction} class="button-wide button-outline-clr space-btn-close border-0">{buttonOptions[0].text}</button>
            </div>
        </div>
     );
}
 
export default ModalInfo;