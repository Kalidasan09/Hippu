import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProposalPage from "./pages/ProposalPage";
import MemoryLane from "./pages/MemoryLane";
import LoveQuiz from "./pages/LoveQuiz";
import FinalReveal from "./pages/FinalReveal";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProposalPage />} />
          <Route path="/memories" element={<MemoryLane />} />
          <Route path="/quiz" element={<LoveQuiz />} />
          <Route path="/reveal" element={<FinalReveal />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
