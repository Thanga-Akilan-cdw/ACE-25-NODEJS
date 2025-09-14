import { search } from "../utils/searchHandler.js";

export const searchService = async (keyword) => {
    const results = await search(keyword);
    return results;
}