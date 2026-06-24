import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AriaPage from "./pages/AriaPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aria" element={<AriaPage />} />
    </Routes>
  );
}
