import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar/Navbar.jsx';
import Timer from './component/Timer/Timer.jsx';
import Restaurant from './component/Restaurant/Restaurant.jsx';
import LeafletMap from './component/LeafletMap/LeafletMap.jsx';
import NewsSlider from './component/NewsSlider/NewsSlider.jsx';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/Restaurant" element={<Restaurant />} />
        <Route path="/LeafletMap" element={<LeafletMap />} />
        <Route path="/NewsSlider" element={<NewsSlider />} />
      </Routes>
    </div>
  );
}

export default App;
