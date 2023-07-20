import React from "react";
import { useHits } from "react-instantsearch-hooks-web";

const ProductHits = () => {
  const { hits } = useHits();

  console.log("hits.length", hits.length);

  return (
    <div>
      <h3>ProductHits</h3>
      <ul>
        {hits.map((hit) => (
          <li key={hit.objectID}>
            <div>{hit.prod_name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductHits;
