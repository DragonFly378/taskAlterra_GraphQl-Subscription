import "./style/style.css";

import SideNavbar from "./components/SideNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Author from "./pages/Author";
import NotFound from "./pages/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <SideNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/about-app" element={<About />} />
          <Route path="/about/about-author" element={<Author />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
