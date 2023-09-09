import React from "react";

type CategoriesProps = {
  selectedCategory: number;
  setSelectedCategory: (idx: number)=>void;
}

export const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(({ selectedCategory, setSelectedCategory }) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(index)}
            className={selectedCategory === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}) 

export default Categories;
