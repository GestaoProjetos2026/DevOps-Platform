import React from 'react';
import './Tabs.css';

const Tabs = () => {
  return (
    <div className="tabs-container">
      <div className="tabs-left">
        <button className="tab active">Lançamentos</button>
      </div>
      <div className="tabs-right">
        <span className="tabs-info">Mostrando 4 soluções</span>
      </div>
    </div>
  );
};

export default Tabs;
