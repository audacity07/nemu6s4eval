import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Posts } from "./Components/Posts";
import { Signup } from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
