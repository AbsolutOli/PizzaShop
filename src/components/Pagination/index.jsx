import styles from "./pagination.module.scss";

function Pagination() {
  return (
    <div className={styles.pagination}>
      <ul className="pagination__buttons">
        <li>
          <button className="pagination__back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </svg>
          </button>
        </li>
        <li>
          <button className={styles.active}>1</button>
        </li>
        <li>
          <button className="">1</button>
        </li>
        <li>
          <button className="">1</button>
        </li>
        <li>
          <button className="pagination__next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
