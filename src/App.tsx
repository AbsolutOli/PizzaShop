import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import Home from "./pages/Home";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const FullPizzaBlock = React.lazy(
  () =>
    import(
      /* webpackChunkName: "FullPizzaBlock" */ "./components/FullPizzaBlock"
    )
);
const PageNotFound = React.lazy(
  () => import(/* webpackChunkName: "PageNotFound" */ "./pages/PageNotFound")
);

function App() {
  return (
    <div className="wrapper">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path=":id"
            element={
              <Suspense>
                <FullPizzaBlock />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/cart"
          element={
            <Suspense>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
