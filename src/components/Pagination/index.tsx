import styles from "./pagination.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectFilterPage, setPage } from "../../redux/slices/filterSlice";

type PaginationProps = {
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const dispatch = useDispatch();
  const activePage = useSelector(selectFilterPage);
  return (
    <div className={styles.pagination}>
      <ul className="pagination__buttons">
        <li>
          <button
            onClick={() => dispatch(setPage(activePage - 1))}
            disabled={activePage === 1 ? true : false}
            className={styles.pagination__back}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </svg>
          </button>
        </li>
        {[...Array(pageCount)].map((_, index) => (
          <li key={index}>
            <button
              onClick={(event) => dispatch(setPage(index + 1))}
              className={activePage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => dispatch(setPage(activePage + 1))}
            disabled={activePage === pageCount ? true : false}
            className={styles.pagination__next}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
