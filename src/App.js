import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
