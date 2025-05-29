import { searchService } from "../services/search.service.js";

export const searchController = async (req, res, next) => {
    const {keyword} = req.params;
    const results = await searchService(keyword);
    res.send(results);
}