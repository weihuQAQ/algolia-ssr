import { getInitialResults, waitForResults } from "instantsearch.js/es/lib/server";

import { InstantSearchServerContext } from "react-instantsearch-hooks";
import algoliasearch from "algoliasearch";
import React, { FC } from "react";
import { InstantSearch, InstantSearchSSRProvider, InstantSearchServerState } from "react-instantsearch-hooks-web";
import { GetServerData, PageProps } from "gatsby";
import { SearchResponse } from "@algolia/client-search";
import { getServerState } from "react-instantsearch-hooks-server";
import { renderToString } from "react-dom/server";

const searchRef = {
  current: undefined,
};

const createNotifyServer = () => {
  let hasBeenNotified = false;
  const notifyServer = ({ search }) => {
    if (hasBeenNotified) {
      throw new Error(
        "getServerState should be called with a single InstantSearchSSRProvider and a single InstantSearch component."
      );
    }

    hasBeenNotified = true;
    searchRef.current = search;
  };

  return notifyServer;
};

const res2 = await Promise.resolve()
  .then(() => {
    const s = renderToString(
      <InstantSearchServerContext.Provider value={{ notifyServer: createNotifyServer() }}>
        <ServerApp />
      </InstantSearchServerContext.Provider>
    );
    console.log(s);
  })
  .then(() => new Promise((resolve) => setTimeout(resolve, 0)))
  .then(() => {
    if (!searchRef.current) {
      throw new Error(
        "Unable to retrieve InstantSearch's server state in `getServerState()`. Did you mount the <InstantSearch> component?"
      );
    }
    return waitForResults(searchRef.current);
  })
  .then(() => {
    return {
      initialResults: getInitialResults(searchRef.current!.mainIndex),
    };
  });
