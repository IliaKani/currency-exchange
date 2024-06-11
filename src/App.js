import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromValue, setFromValue] = React.useState(1);
  const [toValue, setToValue] = React.useState(0);
  const ratesRef = React.useRef({});

  const calculateConversion = (value, fromCurrency, toCurrency) => {
    const fromRate = fromCurrency === 'EUR' ? 1 : ratesRef.current[fromCurrency];
    const toRate = toCurrency === 'EUR' ? 1 : ratesRef.current[toCurrency];
    const euroValue = value / fromRate;
    return euroValue * toRate;
  }

  const onChangeFromValue = (value) => {
    if (Object.keys(ratesRef.current).length > 0) {
      setToValue(calculateConversion(value, fromCurrency, toCurrency));
    }
    setFromValue(value);
  }

  const onChangeToValue = (value) => {
    if (Object.keys(ratesRef.current).length > 0) {
      setFromValue(calculateConversion(value, toCurrency, fromCurrency));
    }
    setToValue(value);
  }

  React.useEffect(() => {
    onChangeFromValue(fromValue);
  }, [fromCurrency, fromValue]);

  React.useEffect(() => {
    onChangeToValue(toValue);
  }, [toCurrency, toValue]);

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
      />
      <Block 
        value={toValue} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToValue}
      />
    </div>
  );
}

export default App;
