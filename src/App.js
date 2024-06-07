import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [rates, setRates] = React.useState({});

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
      <Block value={0} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={0} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
