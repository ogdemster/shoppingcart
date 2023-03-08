import { Routes, Route } from "react-router-dom";
import CartDetail from "./components/CartDetail";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import Navi from "./components/Navi";
import { Container } from "react-bootstrap";
import ShopHistory from "./components/ShopHistory";
import ShopHistoryDetail from "./components/ShopHistoryDetail";
import Account from "./components/Account";
import Login2 from "./components/Login2";

function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/cartdetail" element={<CartDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shophistory" element={<ShopHistory />} />
        <Route path="/shophistorydetail/:id" element={<ShopHistoryDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login2" element={<Login2 />} />
      </Routes>
    </Container>
  );
}

export default App;
