import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LiciPage from "./pages/LiciPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lici" element={<LiciPage />} />
      {/* El asistente se llamaba ARIA: los enlaces que ya circulan siguen llegando. */}
      <Route path="/aria" element={<Navigate to="/lici" replace />} />
    </Routes>
  );
}
