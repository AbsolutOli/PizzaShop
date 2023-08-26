import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";

function Home() {
  const [pizzasArr, setPizzasArr] = React.useState([]);
  const [pizzaLoading, setPizzaLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSortType, setActiveSortType] = React.useState({
    name: "популярности",
    parameter: "rating",
  });
  const [activeSortOrder, setActiveSortOrder] = React.useState(false); //false - ASC, true - DESK

  React.useEffect(() => {
    console.log(activeSortOrder);
    setPizzaLoading(true);
    const category = activeCategory ? `category=${activeCategory}` : "";
    const sort = `&sortBy=${activeSortType.parameter}`;
    const order = `&order=${activeSortOrder ? "desc" : "asc"}`;

    fetch(
      `https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items?${
        category + sort + order
      }`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzasArr(arr);
        setPizzaLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activeSortType, activeSortOrder]);
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            selectedCategory={activeCategory}
            setSelectedCategory={(index) => setActiveCategory(index)}
          />
          <Sort
            selectedType={activeSortType}
            setSelectedType={(index) => setActiveSortType(index)}
            selectedOrder={activeSortOrder}
            setSelectedOrder={(state) => setActiveSortOrder(state)}
          />
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