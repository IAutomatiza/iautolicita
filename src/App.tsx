import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LiciPage from "./pages/LiciPage";
import PreciosRedirige from "./pages/PreciosRedirige";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lici" element={<LiciPage />} />
      {/* Los planes viven en la app, que es la única fuente del precio.
          Estas dos rutas solo rescatan los enlaces que ya circulan. */}
      <Route path="/precios" element={<PreciosRedirige />} />
      <Route path="/planes" element={<PreciosRedirige />} />
      {/* El asistente se llamaba ARIA: los enlaces que ya circulan siguen llegando. */}
      <Route path="/aria" element={<Navigate to="/lici" replace />} />
    </Routes>
  );
}
