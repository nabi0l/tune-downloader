import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from "./contexts/cartContext";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SearchProvider } from "./contexts/SearchContext";
import Footer from './ui/navigation/Footer';
import Navbar from './ui/navigation/Navbar';

// Pages

import Artist from './pages/catalog/artists/Artist';
import Albums from './pages/catalog/albums/Albums';
import Singles from './pages/catalog/singles/Singles';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Store from './pages/store/Store';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import Favorites from './pages/profile/favorites/Favorites';
import PurchaseHistory from './pages/profile/purchaseHistory/PurchaseHistory';
import Settings from './pages/profile/settings/Settings.jsx';
import Terms from './pages/terms/Terms';
import Privacy from './pages/privacy/Privacy';
import Account from './pages/profile/Account';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import SearchResults from './pages/search';
import CheckoutPage from './pages/checkout/CheckoutPage';

// import AdminRoutes from './pages/admin/AdminRoutes';
// import AdminLayout from './pages/admin/layout/AdminLayout.jsx';
// import Dashboard from './pages/admin/dashboard.jsx';
// import Songs from './pages/admin/songs/Songs.jsx';
// import AdminAlbums from './pages/admin/Albums.jsx';
// import Artists from './pages/admin/Artists.jsx';
// import Users from './pages/admin/Users.jsx';
// import Analytics from './pages/admin/Analytics.jsx';
// import AdminSettings from './pages/admin/settings.jsx';
// import CheckoutPage from './pages/checkout/CheckoutPage';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/catalog/artists" element={<Artist />} />
              <Route path="/catalog/albums" element={<Albums />} />
              <Route path="/catalog/singles" element={<Singles />} />
              <Route path="/store" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/account/settings" element={<Settings />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/account" element={<Account />} />
              <Route path="/artists/:id" element={<Artist />} />

              {/* <Route path="/admin/*" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="songs" element={<Songs />} />
                <Route path="albums" element={<AdminAlbums />} />
                <Route path="artists" element={<Artists />} />
                <Route path="users" element={<Users />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route> */}

              <Route path="/search" element={<SearchResults />} />
            </Routes>
            <Footer />
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;