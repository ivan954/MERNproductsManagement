import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ManageScreen from "./screens/ManageScreen";
import UpdateScreen from "./screens/UpdateScreen";
import CreateScreen from "./screens/CreateScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />}></Route>

            <Route exact path="/manage" element={<ManageScreen />}></Route>
            <Route exact path="/product/:id" element={<UpdateScreen />}></Route>
            <Route exact path="/create" element={<CreateScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
