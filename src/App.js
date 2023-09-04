// import './App.css';
import React, { useState } from 'react';
import NavBar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function App() {
  const pageSize = 5;
  console.log(process.env);
  const apiKey   =  process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(2);
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
        onLoaderFinished={() =>setProgress(0)}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<News key="general"    setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="general" />} />
            <Route path="/business" element={<News key="business" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="entertainment" />} />
            <Route path="/general" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="general" />} />
            <Route path="/health" element={<News key="health" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="health" />} />
            <Route path="/science" element={<News key="science" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="science" />} />
            <Route path="/sports" element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="sports" />} />
            <Route path="/technology" element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pageSize={5} country="in" category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
