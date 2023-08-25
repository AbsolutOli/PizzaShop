import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";

function Home() {
  const [pizzasArr, setPizzasArr] = React.useState([]);
  const [pizzaLoading, setPizzaLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setPizzasArr(arr);
        setPizzaLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items__wrapper">
          <div className="content__items">
            {pizzaLoading
              ? [...Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
              : pizzasArr.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
