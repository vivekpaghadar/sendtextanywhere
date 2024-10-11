import './App.css';
import Headers from './Components/Header';
import AboutUs from './Components/about_us';
import ContectUs from './Components/contect_us';
import LiveChat from './Components/livechat';
import Home from './Components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Privacy from './Components/privacy';

function App() {
  return (
    <Router>
      <div className="App">
        <Headers theme="light" />
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contect" element={<ContectUs />} />
            <Route path="/livechat" element={<LiveChat />} />
          </Routes>
        </div>
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container">
            <span className="text-muted">© 2024 SendTextAnywhere. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;