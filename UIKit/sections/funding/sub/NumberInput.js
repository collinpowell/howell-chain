import { useThemeUI } from "theme-ui";

const NumberInput = ({state, setState}) => {
  const { colorMode } = useThemeUI();

    function incrementValue(e) {
        e.preventDefault();
        if(!isNaN(state)){
            setState(Number(state + 1));
        }else{
            setState(1);
        }
      }
      
      function decrementValue(e) {
        e.preventDefault();
        if(!isNaN(state) && state >= 1){
            setState(Number(state - 1));
        }else{
            setState('');
        }
      }

      function onHandleChange(e){
        let telephone = e.target.value;

        console.log(telephone)
       
        setState(telephone)
    };
    return (
        <>
        <div className="input-group1">
            <input type="button" value="-" className="button-minus" data-field="quantity" onClick={(e) => {  decrementValue(e)}}/>
            <input type="number" step="1" max="" value={state} name="quantity" className="quantity-field" onChange = {onHandleChange}/>
            <input type="button" value="+" className="button-plus" data-field="quantity"  onClick={(e) => {  incrementValue(e)}}/>
        </div>
        <style>{`
        input,
        textarea {
          font-size:30px;
          box-sizing: border-box;
          margin: 0;
          background:transparent;
          color: ${colorMode === "default" ? "black" : "white"};
          outline: none;
          padding: 10px;
        }
        
        input[type="button"] {
          -webkit-appearance: button;
          cursor: pointer;
          border: none;
        }
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        
        .input-group1 {
          clear: both;
          position: relative;
          display:flex;
          justify-content: center;
        }
        
        .input-group1 input[type='button'] {
          background-color: transparent;
          color:${colorMode === "default" ? "black" : "white"};
          min-width: 38px;
          width: auto;
          align-items: center;
          transition: all 300ms ease;
        }
        
        .input-group1 .button-minus,
        .input-group1 .button-plus {
          font-weight: bold;
          height: 38px;
          padding: 0;
          width: 38px;
          position: relative;
        }
        
        .input-group1 .quantity-field {
          position: relative;
          height: 38px;
          left: -6px;
          text-align: center;
          width: 150px;
          display: inline-block;
          margin: 0 0 5px;
          resize: vertical;
        }
        
        .button-plus {
          left: -13px;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
          -webkit-appearance: none;
          border: none;
        }
        
        `}
        </style>
        </>
    )
}

export default NumberInput