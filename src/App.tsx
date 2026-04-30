import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Remittance } from "./pages/Remittance";
import { Support } from "./pages/Support";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";
import { AboutUs } from "./pages/AboutUs";
import { MultiCurrencyWallet } from "./pages/MultiCurrencyWallet.tsx";
import { VirtualCard } from "./pages/VirtualCard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="remittance" element={<Remittance />} />
          <Route
            path="multi-currency-wallet"
            element={<MultiCurrencyWallet />}
          />
          <Route path="virtual-card" element={<VirtualCard />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
