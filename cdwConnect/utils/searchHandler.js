
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";


export const search = async (keyword) => {
    const results = [];
    const collections  = [ User, Post];

    for (const  model of collections) {
        try {
          const docs = await model.find(
            { $text: { $search: keyword } }, 
            { score: { $meta: "textScore" } } 
          )
          .sort({ score: { $meta: "textScore" } })
          .lean(); 

          docs.forEach(doc => {
            results.push({
                Collection: model.modelName,
                data: doc
            })
          })

        }
        catch (err) {
            console.error(`Error searching in ${name}:`, err);
        }


    };

    return results;
}