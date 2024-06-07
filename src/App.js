import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  
  return (
    <div className="App">
      <Block value={0} currency="EUR" onChangeCurrency={(cur) => console.log(cur)} />
      <Block value={0} currency="USD" />
    </div>
  );
}

export default App;
