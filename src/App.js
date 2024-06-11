import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromValue, setFromValue] = React.useState(1);
  const [toValue, setToValue] = React.useState(0);
  const [activeField, setActiveField] = React.useState('from'); // Set default active field
  const ratesRef = React.useRef({});

  const calculateConversion = (value, fromCurrency, toCurrency) => {
    const fromRate = fromCurrency === 'EUR' ? 1 : ratesRef.current[fromCurrency];
    const toRate = toCurrency === 'EUR' ? 1 : ratesRef.current[toCurrency];
    const euroValue = value / fromRate;
    return Number((euroValue * toRate).toFixed(2));
  }

  const onChangeFromValue = (value) => {
    setFromValue(value);
    if (activeField === 'from' && Object.keys(ratesRef.current).length > 0) {
      setToValue(calculateConversion(value, fromCurrency, toCurrency));
    }
  }

  const onChangeToValue = (value) => {
    setToValue(value);
    if (activeField === 'to' && Object.keys(ratesRef.current).length > 0) {
      setFromValue(calculateConversion(value, toCurrency, fromCurrency));
    }
  }


  React.useEffect(() => {
    if (activeField === 'from') {
      setToValue(calculateConversion(fromValue, fromCurrency, toCurrency));
    } else {
      setFromValue(calculateConversion(toValue, toCurrency, fromCurrency));
    }
  }, [fromCurrency, toCurrency]);

  React.useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.frankfurter.app/latest');
        const json = await res.json();
        ratesRef.current = json.rates;
        onChangeFromValue(1);
      } catch (err) {
        console.error(err);
        alert('Failed to load exchange rates');
      }
    }
    fetchRates();
  }, []);

  return (
    <div className="App">
      <Block 
        value={fromValue} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromValue}
        onClick={() => setActiveField('from')} // Set active field on click
      />
      <Block 
        value={toValue} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToValue}
        onClick={() => setActiveField('to')} // Set active field on click
      />
    </div>
  );
}

export default App;
