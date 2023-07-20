import React, { FC, useEffect } from "react";
import { useInstantSearch, RangeInput, RefinementList } from "react-instantsearch-hooks-web";
import { FacetMapper } from "../utils";

interface FiltersProps {
  facets: FacetMapper[];
}

const RenderFacet: FC<FacetMapper> = ({ type, attribute }) => {
  switch (type) {
    case "refinementList":
      return <RefinementList attribute={attribute} />;
    case "range":
      return <RangeInput attribute={attribute} />;
    default:
      return <></>;
  }
};

const Filters: FC<FiltersProps> = ({ facets }) => {
  const { indexUiState, setIndexUiState } = useInstantSearch();

  useEffect(() => {
    setIndexUiState(indexUiState);
  }, []);

  return (
    <div style={{ marginRight: 20 }}>
      <h3>Filters</h3>

      {facets.map((facet) => (
        <RenderFacet key={facet.attribute} {...facet} />
      ))}
    </div>
  );
};

export default Filters;
