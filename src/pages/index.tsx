import React, { FC } from "react";
import algoliasearch from "algoliasearch";
import { GetServerData, PageProps } from "gatsby";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { renderToString } from "react-dom/server";

import Filters from "../components/Filters";
import ProductHits from "../components/ProductHits";

import filters from "../../filters.json";
import { getFacets } from "../utils";

const searchClient = algoliasearch("", "");
const defaultIndex = "";
const facets = getFacets(filters);

const ServerApp: FC = ({ serverState }) => {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch searchClient={searchClient} indexName={defaultIndex}>
        <Filters facets={facets} />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

const App: FC<PageProps> = (props) => {
  console.log(123, props.serverData);

  return (
    <InstantSearchSSRProvider initialResults={props.serverData.initialResults}>
      <InstantSearch searchClient={searchClient} indexName={defaultIndex}>
        <div style={{ display: "flex" }}>
          <Filters facets={facets} />
          <ProductHits />
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export default App;

export const getServerData: GetServerData<Record<string, unknown>> = async (props) => {
  const res = await getServerState(<ServerApp />, { renderToString });

  return {
    status: 200,
    headers: {},
    props: {
      initialResults: res.initialResults,
    },
  };
};
