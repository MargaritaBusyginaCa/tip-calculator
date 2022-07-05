import React, {useState, useEffect, useRef} from "react";
import "../src/index.css"
import { nanoid } from 'nanoid'

function App(){
    const refHeader = useRef()
    const refInput = useRef()
    const [formData, setFormData] = useState({
        bill:"",
        tip:"",
        numberOfPeople:""
    })
    const [reload, setReload] = useState(false)
    const [tipTotal, setTipTotal] = useState(0)
    const [totalPerPerson, setTotalPerPerson] = useState(0)
    const tipOptions = [5, 10, 15, 25, 50]
    const tipsDisplay = tipOptions.map(tip =>{
        return(
            <div className="tip-radio--container">
             <button className="radio-btn" name="tip" value={tip} onClick={handleChange}>{tip}%</button>
            </div>
        )
    })
    function handleChange (event){
      const {name, value} = event.target
      setFormData(prevData =>({
        ...prevData,
        [name]:value
      }))
      setReload(!reload)
    }

    useEffect(() =>{
      calculateTotal()  
    }, [reload])

    function calculateTotal(){
      if(!formData.bill){
        return false
      }else if(!formData.tip){
        return false
      }else if(!formData.numberOfPeople){
        return false
      }else{
        let tips = formData.bill * (formData.tip / 100)
        if(formData.numberOfPeople == 0){
          refHeader.current.className = "warning-label"
          refInput.current.className = "input--container warning"
          return false
        }else{
          refHeader.current.className = "hide"
          refInput.current.className = "input--container warning--hide"
        }
        setTotalPerPerson(((+formData.bill + +tips) / formData.numberOfPeople).toFixed(1))
        setTipTotal((tips / formData.numberOfPeople).toFixed(1))
      }
    }

    function reset(){
      setFormData({
        bill:"",
        tip:"",
        numberOfPeople:""
      })
      setTipTotal(0)
      setTotalPerPerson(0)
      setReload(!reload)
      console.log(formData)
    }

    return(
        <div className="parent">
          <img src={require("../images/logo.svg").default} className="logo"/>

          <div className="splitter--container">
           <div className="input--container">
            <div className="bill">
                <h2>Bill</h2>
                <div className="input--container">
                 <input type="number" className="input" name="bill" onChange={handleChange} value={formData.bill}/>
                </div>
            </div>{/**end of bill */}
            <div className="tip--container">
                <h2>Select Tip %</h2>
                <div className="tip-grid">
                    {tipsDisplay}
                    <div className="custom--tip">
                     <input placeholder="Custom" type="number" name="tip" onChange={handleChange} value={formData.tip}/> 
                    </div>
                </div>
            </div>{/**end of bill */}
            <div className="people--number">
              <div className="label-people">
              <h2>Number of People</h2> 
              <h2 className="hide" ref={refHeader}>Can't be zero</h2>
              </div>
              <div className="input--container warning--hide" ref={refInput}>
                <input type="number" className="input" name="numberOfPeople" onChange={handleChange} value={formData.numberOfPeople}/>
              </div>
            </div>
           </div>{/**end of input--container */}

           <div className="output--container">
            <div className="tip--final final">
              <div>
               <h3>Tip Amount</h3>
               <h4>/ person</h4>
              </div>   
              <h1>{tipTotal}</h1>
            </div>

            <div className="total--final final">
              <div>
               <h3>Total</h3>
               <h4>/ person</h4>
              </div>   
              <h1>{totalPerPerson}</h1>
            </div>

            <button className="reset-btn" onClick={reset}>Reset</button>

           </div>
          </div>
        </div>
    )

}
export default App