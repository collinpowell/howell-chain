import { Box } from "theme-ui";

const NumberInput = ({ state, setState }) => {

  function incrementValue(e) {
    e.preventDefault();
    if (!isNaN(state)) {
      setState(Number(state + 1));
    } else {
      setState(1);
    }
  }

  function decrementValue(e) {
    e.preventDefault();
    if (!isNaN(state) && state >= 1) {
      setState(Number(state - 1));
    } else {
      setState('');
    }
  }

  function onHandleChange(e) {
    let telephone = e.target.value;

    //console.log(telephone)

    setState(telephone)
  };
  return (
    <>
      <Box sx={{
        input: {
          fontSize: '30px',
          boxSizing: 'border-box',
          margin: 0,
          background: 'transparent',
          color: 'text',
          outline: 'none',
          padding: '10px'
        },
        'input[type=button]': {
          backgroundColor: 'transparent',
          color: 'text',
          minWidth: '38px',
          width: 'auto',
          alignItems: 'center',
          transition: 'all 300ms ease'
        },
        clear: 'both',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        '.button-minus,.button-plus': {
          fontWeight: 'bold',
          height: '38px',
          padding: 0,
          width: '38px',
          border: 'none',
          position: 'relative',
        },
        '.quantity-field': {
          position: 'relative',
          border: 'none',
          height: '38px',
          left: '-6px',
          textAlign: 'center',
          width: '250px',
          display: 'inline-block',
          margin: '0 0 5px',
          resize: 'vertical'
        },
        '.button-plus': {
          left: '-13px'
        }
      }} >
        <input type="number" step="1" max="" value={state} style={{
          width: 'fit-content'
        }} name="quantity" className="quantity-field" onChange={onHandleChange} />
      </Box>
    </>
  )
}

export default NumberInput