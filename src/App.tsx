import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart";
import FullPizzaBlock from "./components/FullPizzaBlock";

function App() {
  
  return (
      <div className="wrapper">
        <Header />

        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":id" element={<FullPizzaBlock/>}/>
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
  );
}

export default App;
