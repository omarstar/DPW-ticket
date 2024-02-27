import Text from "../../Text";
import "./line.css"
import "./line2.css"

const Line2 = ({ activeNum = 0, onClickFuntion}) => {
    const data = [1,2,3,4,5,6];
  activeNum = 8;
    return(
        <>
            <div id="parentBox" onClick={onClickFuntion} className="flex-row-reverse">
                    
                    <div className="line-bg"></div>
                    {/* {
                        activeNum > 6 &&
                        <div id="greaterLine">
                            <p id="greaterLineText">{ activeNum}</p>
                        </div>
                    } */}
                    

                    
                    {data.map(nb=> (
                        <div id="mainLine" key={nb} className={"col queue-item center-text parent-center " + (activeNum === nb ? "selected " : "other ") + (nb === 1 ? "first-element " : (nb === data.length && activeNum < data.length) ? "last-element " : "" )}>
                            {   
                                activeNum === nb ? (
                                    <div className="child-center">
                                        <p className= "mainLineText " >{nb}</p>
                                        <p className= "mainLineText you-text" ><Text name="txtYou" /></p>

                                    </div>
                                ) : (
                                    <div className="child-center center-content">
                                        <p className= "mainLineText " >{nb}</p>
                                    </div>
                                )
                            }

                        </div>
                    ))}
                    {
                        activeNum > data.length+1 && (
                            <div id="mainLine" className="col queue-item center-text parent-center threeDots">
                                <div className="child-center center-content">
                                    <p className= "mainLineText " >...</p>
                                </div>
                            </div>
                        )
                    }
                    {
                         activeNum > data.length ? (
                                <div id="mainLine" className="col queue-item center-text parent-center selected">
                                    <div className="child-center">
                                        <p className= "mainLineText " >{activeNum}</p>
                                        <p className= "mainLineText you-text" >You</p>
                                    </div>
                                </div>
                        ) : (
                            <div id="mainLine" className="col queue-item center-text parent-center other hidden-color ">
                                <div className="child-center">
                                    <p className= "mainLineText " ></p>
                                    <p className= "mainLineText you-text" ></p>
                                </div>
                            </div>
                        )
                    }
                    
                {/* </div> */}
            </div>
        </>
    )
}

export default Line2