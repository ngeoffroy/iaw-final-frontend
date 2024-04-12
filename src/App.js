import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Denuncias from "./components/pages/denuncias";
import SubmitDenuncia from "./components/pages/submitdenuncia";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="denuncias" element={<Denuncias />} />
        <Route path="nuevadenuncia" element={<SubmitDenuncia />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
