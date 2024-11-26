import { getClient } from "./client";
import { gql } from "@apollo/client";
let cacheDelay = parseInt(process.env.CACHE_DELAY); //seconds, ie 120
export const revalidate = (Number.isInteger(cacheDelay) && cacheDelay > 0 ? cacheDelay : 120);

const Categories = gql`query Categories($sort: [String]) {
  Categories(sort: $sort) {
    id
    categoryName
    color
    icon {
      id
      filename_disk
    }
  }
}`;

const CategoryCollections = gql`query Collections($filter: Collection_filter) {
  Collection(filter: $filter) {
    id
    assetTitle
    status
    provenance
    bodyCopy
    imageEntries {
      ImageEntry_id {
        id
        image {
          id
          filename_disk
        }
      }
    }
  }
}`;

const CollectionDetail = gql`query Collection_by_id($collectionByIdId: ID!) {
  Collection_by_id(id: $collectionByIdId) {
    id
    assetTitle
    bodyCopy
    status
    provenance
    imageEntries {
      id
      ImageEntry_id {
        id
        accessibilityDescription
        accessibilityTags
        imageCaption
        image {
          id
          filename_disk
          filename_download
        }
      }
    }
    category {
      id
    }
  }
}`;

const CategoryByID = gql`query Categories_by_id($categoriesByIdId: ID!) {
  Categories_by_id(id: $categoriesByIdId) {
    id
    categoryName
  }
}`;

export const getCollectionByID = async (id) => {
    try {
        const client = getClient();
        const { data } = await client.query({
            query: CollectionDetail,
            context: {
                fetchOptions: {
                    next: { revalidate: revalidate },
                }
            },
            variables: {
                collectionByIdId: id
            },
        });
        return data.Collection_by_id;
    } catch (error) {
        return {
            error: error.message,
            message: "Error fetching data"
        }
    }
}

export const getCategoryByID = async (id) => {
    try {
        const client = getClient();
        const { data } = await client.query({
            query: CategoryByID,
            context: {
                fetchOptions: {
                    next: { revalidate: revalidate },
                }
            },
            variables: {
                categoriesByIdId: id
            },
        });
        return data.Categories_by_id;
    } catch (error) {
        return {
            error: error.message,
            message: "Error fetching data"
        }
    }
}

export const getCollectionsByCategory = async (id) => {
    try {
        const client = getClient();
        const { data } = await client.query({
            query: CategoryCollections,
            context: {
                fetchOptions: {
                    next: { revalidate: revalidate },
                }
            },
            variables: {
                filter: {
                    category: {
                        id: {
                            _eq: id
                        }
                    },
                    status: {
                        _eq: "published"
                    }
                }
            },
        });
        return data.Collection;
    } catch (error) {
        return {
            error: error.message,
            message: "Error fetching data"
        }
    }
};

export const getCategories = async () => {
    try {
        const client = getClient();
        const { data } = await client.query({
            query: Categories,
            context: {
                fetchOptions: {
                    next: { revalidate: revalidate },
                }
            },
            variables: {
                sort: ["categoryName"]
            },
        });
        return data.Categories;
    } catch (error) {
        return {
            error: error.message,
            message: "Error fetching data"
        }
    }
};