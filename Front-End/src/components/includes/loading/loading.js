import "./loading.css"

const Loading = ({hSpacer}) => {
    const heightSpacer = hSpacer ? hSpacer : "h-30";
    return(
            <div id="loading_wrap">
                <div id="loading-inner"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#0068A9" stroke="#0068A9" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#0068A9" stroke="#0068A9" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#0068A9" stroke="#0068A9" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg> 
                </div>
            </div>
    )
}

export default Loading