import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Movie from "./routes/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
