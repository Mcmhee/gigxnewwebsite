import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Remittance } from "./pages/Remittance";
import { Support } from "./pages/Support";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";
import { AboutUs } from "./pages/AboutUs";
import { MultiCurrencyWallet } from "./pages/MultiCurrencyWallet.tsx";
import { VirtualCard } from "./pages/VirtualCard.tsx";
import { DeleteAccountRequest } from "./pages/DeleteAccountRequest";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route
            path="delete-account-request"
            element={<DeleteAccountRequest />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
