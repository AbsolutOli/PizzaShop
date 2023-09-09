import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setFilters,
} from "../redux/filter/slice";
import axios from "axios";
import qs from "qs";

import { Outlet, useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { sortType } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { setPageCount } from "../redux/pizza/slice";
import {  FilterState, SortFilterState } from "../redux/filter/types";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncRequest";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    activeCategory,
    sort: activeSortType,
    order: activeSortOrder,
    activePage,
    searchValue,
  } = useSelector(selectFilter);
  const {
    pizzasArr,
    pageCount,
    status: pizzaLoading,
  } = useSelector(selectPizzaData);

  console.log(pizzasArr);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const pizzasFetch = async () => {
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

    dispatch(
      // @ts-ignore 
      fetchPizzas({ search, category, limit, page, sort, order }));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const {activeCategory, activePage, activeSortOrder, activeSortType} = qs.parse(window.location.search.substring(1));
       
      const order = activeSortOrder === "false" ? false : true;
      const sort = (sortType.find(
        (obj) => obj.parameter === activeSortType
      ) as SortFilterState);
      dispatch(
        setFilters((({
          activeCategory,
          activePage,
          sort,
          order,
        }) as unknown) as FilterState)
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
            {pizzaLoading === "error" ? (
              <div className="content__error">
                <p>😔</p>
                <h3>Не удалось получить список пиц!</h3>
                <h4>
                  Проверьте ваше интернет соединение или вернитесь на эту
                  страницу позже!
                </h4>
              </div>
            ) : pizzaLoading === "loading" ? (
              [...Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
            ) : (
              pizzasArr.map((item: any) => <PizzaBlock key={item.id} {...item} />)
            )}
          </div>
        </div>
        <Outlet/>
        <Pagination pageCount={pageCount} />
      </div>
    </div>
  );
}

export default Home;
