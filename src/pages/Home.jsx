import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import { SearchContext } from "../App";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const {
    categoryId: activeCategory,
    sort: activeSortType,
    order: activeSortOrder,
    page: activePage,
  } = useSelector((state) => state.filter);
  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const [pageCount, setPageCount] = React.useState(1);
  const { searchValue } = React.useContext(SearchContext);
  const [pizzasArr, setPizzasArr] = React.useState([]);
  const [pizzaLoading, setPizzaLoading] = React.useState(true);

  const onGetLength = (value) => {
    value > 0 ? setPageCount(Number(value)) : setPageCount(1);
  };

  React.useEffect(() => {
    setPizzaLoading(true);
    const category = activeCategory ? `&category=${activeCategory}` : "";
    const sort = `&sortBy=${activeSortType.parameter}`;
    const order = `&order=${activeSortOrder ? "desc" : "asc"}`; //false - ASC, true - DESK
    const search = `&search=${searchValue}`;
    const limit = `&limit=8`;
    const page = `&page=${activePage}`;

    axios
      .get(
        `https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items?${
          search + category + sort + order
        }`
      )
      .then((res) => {
        onGetLength((res.data.length / 8).toFixed());
      });

    axios
      .get(
        `https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items?${
          search + category + sort + order + limit + page
        }`
      )
      .then((res) => {
        setPizzasArr(res.data);
        setPizzaLoading(false);
      });

    window.scrollTo(0, 0);
  }, [
    activeCategory,
    activeSortType,
    activeSortOrder,
    searchValue,
    activePage,
  ]);
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            selectedCategory={activeCategory}
            setSelectedCategory={onChangeCategory}
          />
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
        <Pagination pageCount={pageCount} />
      </div>
    </div>
  );
}

export default Home;
