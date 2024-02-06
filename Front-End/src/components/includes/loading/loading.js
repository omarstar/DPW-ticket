import "./loading.css"

const Loading = ({hSpacer}) => {
    const heightSpacer = hSpacer ? hSpacer : "h-30";
    return(
        <>

                <div id="loadingBox" className={heightSpacer + "d-flex flex-column justify-content-center align-items-center"}>
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>

        </>
    )
}

export default Loading