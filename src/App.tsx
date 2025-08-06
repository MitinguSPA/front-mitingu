import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import ProductDetail from "./pages/Shop/ProductDetail";
import Checkout from "./pages/Payment/Checkout";
import BuyerForm from "./pages/Buyer/BuyerForm";
import ConfirmationView from "./pages/Buyer/ConfirmationView";
import PaymentProofPage from "./pages/Payment/PaymentProofPage";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminSales from "./pages/Admin/Sales";
import AdminSalesHistory from "./pages/Admin/SalesHistory";
// import ShippingSettings from "./pages/Admin/ShippingSettings";

import CentroAyuda from "./pages/PrivacyPolicy/HelpCenter";
import Privacidad from "./pages/PrivacyPolicy/Privacy";
import Devoluciones from "./pages/PrivacyPolicy/Returns";
import PoliticaEnvios from "./pages/PrivacyPolicy/ShippingPolicy";
import TerminosCondiciones from "./pages/PrivacyPolicy/TermsConditions";

import { useAuth } from "./store/AuthStore";
import { LoginPage } from "./pages/Admin/LoginPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated } = useAuth();

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="font-roundedjp bg-gradient-to-b from-[#F4A9B6] to-white">
      <BrowserRouter>
        <CartProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />

          <Routes>
            <Route element={<Layout children={undefined} />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/buyer-form" element={<BuyerForm />} />
              <Route
                path="/checkout/confirmation"
                element={<ConfirmationView />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Home />} />
              <Route path="/privacy" element={<Privacidad />} />
              <Route path="/returns" element={<Devoluciones />} />
              <Route path="/shipping-policy" element={<PoliticaEnvios />} />
              <Route
                path="/terms-conditions"
                element={<TerminosCondiciones />}
              />
              <Route path="/help-center" element={<CentroAyuda />} />
            </Route>

            <Route
              path="/checkout/payment-proof-upload/token/:token"
              element={<PaymentProofPage />}
            />

            <Route element={<AdminLayout />}>
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <RequireAuth>
                    <AdminProducts />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RequireAuth>
                    <AdminOrders />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/sales"
                element={
                  <RequireAuth>
                    <AdminSales />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/sales-history"
                element={
                  <RequireAuth>
                    <AdminSalesHistory />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="/admin/shipping"
                element={
                  <RequireAuth>
                    <ShippingSettings />
                  </RequireAuth>
                }
              /> */}
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
