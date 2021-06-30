import React, { FC } from 'react';
import Header from './components/Header';
import Home from './components/Home';

const App: FC = () => (
  <div>
    <Header />
    <Home />
    <div className="flex">
      <div className="w-60 mx-auto text-primary pb-24 lg:pb-10 flex justify-between">
        <div>©2019 Market</div>
        <div>•</div>
        <div>Privacy Policy</div>
      </div>
    </div>
  </div>
);

export default App;
