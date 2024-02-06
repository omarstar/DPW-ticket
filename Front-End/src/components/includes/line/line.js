import "./line.css"

const Line = ({ activeNum = 0, onClickFuntion}) => {
    const data = [1,2,3,4,5,6];
    // console.log('numb, hideFlag', [activeNum,hideGreaterNum])
  
    // Math.abs(nb - activeNum) === 1
    return(
        <>
            <div id="parentBox" onClick={onClickFuntion}>
                <div id="lineBox" className="primary-gradient">
                    
                        {data.map(nb=> (
                            <div id="mainLine" key={nb}>
                                <p className= {"mainLineText " + (activeNum === nb ? "activeNum" :  "" )} >{nb}</p>
                                <div className={nb < data.length ? "threeDots" : ""}>
                                </div>
                            </div>
                        ))}
                    {
                        activeNum > 6 &&
                        <div id="greaterLine">
                            <p id="greaterLineText">{ activeNum}</p>
                        </div>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Line