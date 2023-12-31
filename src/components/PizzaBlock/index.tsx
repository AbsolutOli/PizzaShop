import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/slice";
import { selectPizzaData } from "../../redux/cart/selectors";
import { Link } from "react-router-dom";

type PizzaBlockProps = {
  id: number;
  title: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
};

export const doughTypes = ["тонкое", "традиционное"];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  imageUrl,
  types,
  sizes,
  price,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectPizzaData(id));
  const [activeDoughType, setActiveDoughType] = React.useState(0);
  const [activePizzaSize, setActivePizzaSize] = React.useState(0);

  const itemCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      imageUrl,
      type: doughTypes[activeDoughType],
      size: sizes[activePizzaSize],
      price,
      count: 1,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link
        onClick={(event) => event.stopPropagation()}
        to={`/${id + window.location.search}`}
      >
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
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
          {sizes.map((size, index) => (
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
        <div className="pizza-block__price">от {price} ₴</div>
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
  );
};
