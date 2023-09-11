import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FullPizzaBlock.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { doughTypes } from "../PizzaBlock";
import { selectPizzaData } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";
import { CartSliceItem } from "../../redux/cart/types";
import { Pizza } from "../../redux/pizza/types";
import { categories } from "../Categories";

const FullPizzaBlock: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fullPizza = useSelector((state: RootState) =>
    state.pizza.pizzasArr.find((pizza) => pizza.id === Number(id))
  );

  const contentRef = React.useRef<HTMLDivElement>(null);

  const [activeDoughType, setActiveDoughType] = React.useState(0);
  const [activePizzaSize, setActivePizzaSize] = React.useState(0);

  React.useEffect(() => {
    const onClickBody = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !event.composedPath().includes(contentRef.current)
      ) {
        navigate(`/${window.location.search}`);
      }
    };

    document.body.classList.add("fullPizzaActive");
    document.body.addEventListener("click", onClickBody);

    return () => {
      document.body.classList.remove("fullPizzaActive");
      document.body.removeEventListener("click", onClickBody);
    };
  }, []);

  const item = fullPizza as Pizza & { rating: number; category: number };
  const cartItem = useSelector(selectPizzaData(Number(id)));
  const itemCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (item) {
      const pizza: CartSliceItem = {
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        type: doughTypes[activeDoughType],
        size: item.sizes[activePizzaSize],
        price: item.price,
        count: 1,
      };

      dispatch(addItem(pizza));
    }
  };

  if (!item) {
    return <h2>Loading </h2>;
  }

  return (
    <div className={styles.fullpizza}>
      <div ref={contentRef} className={`${styles.fullpizza__content}`}>
        <div className={styles.fullpizza__closeBtn}>
          <button onClick={() => navigate(`/${window.location.search}`)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#fe5f1e"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>{" "}
            </svg>
          </button>
        </div>
        <div className={styles.fullpizza__img}>
          <img width={500} src={item.imageUrl} alt="Pizza" />
        </div>
        <div className={styles.fullpizza__information}>
          <h1>{item.title}</h1>
          <div className={styles.fullpizza__description}>
            <p>Рейтинг: {item.rating} из 10</p>
            <p>Категория: {categories[item.category]}</p>
          </div>
          <div className="pizza-block__selector">
            <ul>
              {item.types.map((type, index) => (
                <li
                  key={type}
                  onClick={() => setActiveDoughType(index)}
                  className={activeDoughType === index ? "active" : ""}
                >
                  {doughTypes[type]}
                </li>
              ))}
            </ul>
            <ul>
              {item.sizes.map((size, index) => (
                <li
                  key={size}
                  onClick={() => setActivePizzaSize(index)}
                  className={activePizzaSize === index ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {item.price} ₴</div>
            <button
              onClick={() => onClickAdd()}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {itemCount > 0 ? <i>{itemCount}</i> : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizzaBlock;
