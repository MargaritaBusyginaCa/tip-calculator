import React, {useState} from "react";
import "./index.css"
function App(){
    const [formData, setFormData] = useState({
        bill:0,
        tip:0,
        numberOfPeople:0
    })
    const [reload, setReload] = useState(false)
    const [tipTotal, setTipTotal] = useState(0)
    const [totalPerPerson, setTotalPerPerson] = useState(0)
    const tipOptions = [5, 10, 15, 25, 50]
    const tipsDisplay = tipOptions.map(tip =>{
        return(
            <div>
             <input type="radio" name="tip" value={tip}/>
             <label for="html">{tip}%</label>   
            </div>
        )
    })
    return(
        <div className="parent">
          <h1>Splitter</h1>

          <div className="splitter--container">
           <div className="input--container">
            <div className="bill">
                <h2>bill</h2>
                <div className="input--container">
                 <input type="number"/>
                </div>
            </div>{/**end of bill */}
            <div className="tip--container">
                <h2>Select Tip %</h2>
                <div className="tip-grid">
                    {tipsDisplay}
                    <div className="custom--tip">
                     <input placeholder="Custom" type="number"/> 
                    </div>
                </div>
            </div>{/**end of bill */}
            <div className="people--number">
              <h2>Number of People</h2>
              <div className="input--container">
                <input type="number"/>
              </div>
            </div>
           </div>{/**end of input--container */}

           <div className="output--container">
            <div className="tip--final">
              <div>
               <h2>Tip Amount</h2>
               <h3>/ person</h3>
              </div>   
              <h1>$4.27</h1>
            </div>

            <div className="total--final">
              <div>
               <h2>Total</h2>
               <h3>/ person</h3>
              </div>   
              <h1>$32.79</h1>
            </div>

           </div>
          </div>
        </div>
    )

}
export default App