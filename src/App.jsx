import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
import { Col, Row } from "react-bootstrap";
import { AdminPage } from "./components/AdminPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Router>
          <div className="main-container">
            <Routes>
              <Route path="/admin/*" element={<AdminPage />} />
              <Route
                path="/*"
                element={
                  <>
                    <Navbar></Navbar>
                    <Row className="section">
                      <Col sm={12} md={3}>
                        <Sidebar />
                      </Col>
                      <Col sm={12} md={9}>
                        <Main />
                      </Col>
                    </Row>
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
