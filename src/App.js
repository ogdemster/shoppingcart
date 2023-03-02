import { Routes, Route } from "react-router-dom";
import CartDetail from "./components/CartDetail";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Navi from "./components/Navi";
import { Container } from "react-bootstrap";
function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cartdetail" element={<CartDetail />} />
      </Routes>
    </Container>
  );
}

export default App;
