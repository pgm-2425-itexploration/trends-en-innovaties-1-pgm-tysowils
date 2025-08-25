import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Register, CreatePost, EditPost, Detail } from './Pages';
import { Header, Footer } from './Elements';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<Detail />} />

        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
