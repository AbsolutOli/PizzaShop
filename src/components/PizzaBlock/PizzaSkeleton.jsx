import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = (props) => (
  <div className="pizza-block">
    <ContentLoader
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="137" cy="126" r="120" />
      <rect x="0" y="260" rx="5" ry="5" width="280" height="27" />
      <rect x="0" y="307" rx="10" ry="10" width="280" height="87" />
      <rect x="127" y="414" rx="25" ry="25" width="152" height="46" />
      <rect x="0" y="424" rx="5" ry="5" width="90" height="26" />
    </ContentLoader>
  </div>
);

export default PizzaSkeleton;
