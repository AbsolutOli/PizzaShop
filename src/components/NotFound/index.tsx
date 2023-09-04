import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.pagenotfound}>
      <p>😔</p>
      <h3>Страница не найдена</h3>
      <h4>
        Страница была удалена или не существует. Вернитесь на главную страницу
        сайта!
      </h4>
    </div>
  );
}

export default NotFound;
