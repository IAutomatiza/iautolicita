import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LiciPage from "./pages/LiciPage";
import PreciosPage from "./pages/PreciosPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lici" element={<LiciPage />} />
      <Route path="/precios" element={<PreciosPage />} />
      {/* «Planes» circuló un rato con esta dirección. */}
      <Route path="/planes" element={<Navigate to="/precios" replace />} />
      {/* El asistente se llamaba ARIA: los enlaces que ya circulan siguen llegando. */}
      <Route path="/aria" element={<Navigate to="/lici" replace />} />
    </Routes>
  );
}
