import React, {useState, useEffect} from "react";
import "../src/index.css"
function App(){
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
             <button key={tip} className="radio-btn" onClick={handleChange} name="tip" value={tip}>{tip}%</button>
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
          return false
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
              <h2>Number of People</h2>
              <div className="input--container">
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