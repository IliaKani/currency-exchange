import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromValue, setFromValue] = React.useState(1);
  const [toValue, setToValue] = React.useState(0);
  // We will store the exchange rates in this state
  const ratesRef = React.useRef({});

  const onChangeFromValue = (value) => {
    // If the rates are not loaded yet, we don't need to calculate the rate
    if (Object.keys(ratesRef.current).length > 0) {
      // If the from currency is EUR, we don't need to calculate the rate
      const fromRate = fromCurrency === 'EUR' ? 1 : ratesRef.current[fromCurrency];
      const toRate = toCurrency === 'EUR' ? 1 : ratesRef.current[toCurrency];
      const euroValue = value / fromRate;
      const result = euroValue * toRate;
      setToValue(result);
    }
    setFromValue(value);
  }

  const onChangeToValue = (value) => {
    if (Object.keys(ratesRef.current).length > 0) {
      const fromRate = toCurrency === 'EUR' ? 1 : ratesRef.current[toCurrency];
      const toRate = fromCurrency === 'EUR' ? 1 : ratesRef.current[fromCurrency];
      const euroValue = value / fromRate;
      const result = euroValue * toRate;
      setFromValue(result);
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
    fetch('https://api.frankfurter.app/latest')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeFromValue(1);
    }).catch((err) => {
      console.error(err);
      alert('Failed to load exchange rates');
    });
  }, [])

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
