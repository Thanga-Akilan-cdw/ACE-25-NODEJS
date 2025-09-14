import { serviceLogger } from "../logger/index.js";
import { searchService } from "../services/search.service.js";

export const searchController = async (req, res, next) => {
    const {keyword} = req.params;
    const results = await searchService(keyword);
    serviceLogger.info(`Global Search for ${keyword}`);
    res.send(results);
}