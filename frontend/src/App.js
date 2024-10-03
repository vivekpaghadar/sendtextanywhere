import './App.css';
import Headers from './Components/Header';
import AboutUs from './Components/about_us';
import ContectUs from './Components/contect_us';
import LiveChat from './Components/livechat';
import Home from './Components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Headers theme="light" />
        <div className="container my-4">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/contect" element={<ContectUs/>} />
                <Route path="/livechat" element={<LiveChat/>} />
            </Routes>
        </div>
    </div>
</Router>
  );
}

export default App;