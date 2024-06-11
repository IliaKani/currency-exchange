import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromValue, setFromValue] = React.useState(0);
  const [toValue, setToValue] = React.useState(0);

  const [rates, setRates] = React.useState({});

  const onChangeFromValue = (value) => {
    //Rates quote against the Euro by default
    const fromRate = fromCurrency === 'EUR' ? 1 : rates[fromCurrency];
    const toRate = toCurrency === 'EUR' ? 1 : rates[toCurrency];
    const euroValue = value / fromRate;
    const result = euroValue * toRate;
    setToValue(result);
    setFromValue(value);
  }

  const onChangeToValue = (value) => {
    const fromRate = toCurrency === 'EUR' ? 1 : rates[toCurrency];
    const toRate = fromCurrency === 'EUR' ? 1 : rates[fromCurrency];
    const euroValue = value / fromRate;
    const result = euroValue * toRate;
    setFromValue(result);
    setToValue(value);
  }

  React.useEffect(() => {
    fetch('https://api.frankfurter.app/latest')
    .then((res) => res.json())
    .then((json) => {
      setRates(json.rates);
      console.log(json.rates);
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
