import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortType,
  setOrder,
  selectFilter,
  SortFilterState,
} from "../redux/slices/filterSlice";

type SortItem = {
  name: string,
  parameter: string
}

type PopUpClick = MouseEvent & {
  conposedPath: Node[];
}

export const sortType: SortItem[] = [
  { name: "популярности", parameter: "rating" },
  { name: "цене", parameter: "price" },
  { name: "алфавиту", parameter: "title" },
];

const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { sort: selectedType, order: selectedOrder } =
    useSelector(selectFilter);

  const [visibleSort, setVisibleSort] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onBodyClick = (event: MouseEvent) => {
      const _event = event as PopUpClick;
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setVisibleSort(false);
      }
    };
    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const onClickSortType = (type: SortItem) => {
    dispatch(setSortType(type as SortFilterState));
    setVisibleSort(!visibleSort);
  };

  console.log(selectedType, selectedOrder)

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="sort__label__start">
          <svg
            onClick={() => dispatch(setOrder(!selectedOrder))}
            className={selectedOrder ? "sort__label__svg_rotate" : ""}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
        </div>

        <span onClick={() => setVisibleSort(!visibleSort)}>
          {selectedType.name}
        </span>
      </div>
      {visibleSort && (
        <div className="sort__popup">
          <ul>
            {sortType.map((type, index) => (
              <li
                onClick={() => onClickSortType(type)}
                className={selectedType.name === type.name ? "active" : ""}
                key={type.name}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}) 

export default Sort;
