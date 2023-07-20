export interface RootFilter {
  displayName: string;
  componentName: string;
  filters: Filter[];
  defaultActive?: boolean;
}

export interface Filter {
  name: string;
  displayName: string;
  isDynamic: boolean;
  isSort: boolean;
  refinements?: Refinement[];
  isInternal?: boolean;
  isSupportSizeButton?: boolean;
  toolTip?: string;
  imageUrl?: string;
  isHiddenSizeButton?: boolean;
}

export interface Refinement {
  label: string;
  value?: string;
  start?: number;
  end?: number;
  sizeType?: string;
  kidsAgeContentKey?: string;
  imageUrl?: string;
  toolTip?: string;
  name?: string;
  group?: string;
  groupTitle?: string;
}

export interface FacetMapper {
  type: "refinementList" | "range";
  attribute: string;
}

const buildSite = "us";

export const getFacets = (filters: RootFilter[]): FacetMapper[] => {
  return filters
    .map((item) => {
      return item.filters.map((filter) => {
        if (filter.isInternal) {
          return { type: "refinementList", attribute: `${filter.name}.${buildSite}` } as FacetMapper;
        }
        if (filter.isSupportSizeButton) {
          return [
            { type: "refinementList", attribute: filter.name + "_size" },
            { type: "range", attribute: filter.name },
          ] as FacetMapper[];
        }
        return { type: "refinementList", attribute: filter.name } as FacetMapper;
      });
    })
    .flat(2);
};
