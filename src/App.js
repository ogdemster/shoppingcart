import { Routes, Route } from "react-router-dom";
import CartDetail from "./components/CartDetail";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import Navi from "./components/Navi";
import { Container } from "react-bootstrap";
import ShopHistory from "./components/ShopHistory";
function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cartdetail" element={<CartDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shophistory" element={<ShopHistory />} />
      </Routes>
    </Container>
  );
}

export default App;
