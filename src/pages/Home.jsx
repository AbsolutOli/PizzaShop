import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setFilters } from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortType } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import { SearchContext } from "../App";
import Pagination from "../components/Pagination";
import { setPageCount, setPizzasArr } from "../redux/slices/pizzaSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    categoryId: activeCategory,
    sort: activeSortType,
    order: activeSortOrder,
    page: activePage,
  } = useSelector((state) => state.filter);
  const { pizzasArr, pageCount } = useSelector((state) => state.pizza);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const { searchValue } = React.useContext(SearchContext);
  const [pizzaLoading, setPizzaLoading] = React.useState(true);
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const pizzasFetch = async () => {
    setPizzaLoading(true);
    const category = activeCategory ? `&category=${activeCategory}` : "";
    const sort = `&sortBy=${activeSortType.parameter}`;
    const order = `&order=${activeSortOrder ? "desc" : "asc"}`; //false - ASC, true - DESK
    const search = `&search=${searchValue}`;
    const limit = `&limit=8`;
    const page = `&page=${activePage}`;

    try {
      const { data } = await axios.get(
        `https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items?${
          search + category + sort + order
        }`
      );
      dispatch(setPageCount(data));
    } catch (err) {
      console.log(err);
    }

    try {
      const resPizzaArr = await axios.get(
        `https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items?${
          search + category + limit + page + sort + order
        }`
      );
      dispatch(setPizzasArr(resPizzaArr.data));
    } catch (error) {
      console.log(error);
      alert(
        "Не удалось загрузить данные с сервера, проверьте качество интернет соединения или попробуйте позже!"
      );
    } finally {
      setPizzaLoading(false);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const order = params.activeSortOrder === "false" ? false : true;
      const sort = sortType.find(
        (obj) => obj.parameter === params.activeSortType
      );
      dispatch(
        setFilters({
          ...params,
          sort,
          order,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      pizzasFetch();
    }

    isSearch.current = false;
  }, [
    activeCategory,
    activeSortType,
    activeSortOrder,
    searchValue,
    activePage,
  ]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategory,
        activeSortType: activeSortType.parameter,
        activeSortOrder,
        activePage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, activeSortType, activeSortOrder, activePage]);

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
