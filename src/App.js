import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar/Navbar.jsx';
import Timer from './component/Timer/Timer.jsx';
import LeafletMap from './component/LeafletMap/LeafletMap.jsx';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/LeafletMap" element={<LeafletMap />} />
      </Routes>
    </div>
  );
}

export default App;
