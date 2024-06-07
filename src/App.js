import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
 
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
      <Block value={0} currency="EUR" onChangeCurrency={(cur) => console.log(cur)} />
      <Block value={0} currency="USD" />
    </div>
  );
}

export default App;
