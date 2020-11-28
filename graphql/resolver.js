import logger from "../utils/logger";
import { load } from "cheerio";
import { get } from "axios";
import { isValidArray } from "../utils/common";
const resolvers = {
  Query: {
    async getOgMetadata(parent, args, context, info) {
      logger.info("getOgMetadata args -> ", { args });
      try {
        const { url } = args;

        const html = await getHtmlFromUrl(url);
        if (!html) return { ogInfo: {} };

        const ogInfo = {};
        const $ = load(html);
        $("meta").each((i, v) => {
          const { attribs: { content, property } = {} } = v;
          if (
            typeof property === "string" &&
            property.startsWith("og:") &&
            content
          ) {
            const key = `og${property
              .charAt(property.indexOf(":") + 1)
              .toUpperCase()}${property.slice(
              property.indexOf(":") + 2
            )}`.replace(/[^a-zA-Z ]/g, "");

            if (ogInfo[key] && isValidArray(ogInfo[key])) {
              ogInfo[key].push(content);
            } else if (isValidArray(content)) {
              ogInfo[key] = [content];
            } else ogInfo[key] = content;
          }
        });
        return { ogInfo };
      } catch (error) {
        logger.error("Error while getting ogMetaData -> ", error);
        return { ogInfo: {} };
      }
    },
  },
};
const getHtmlFromUrl = async (url) => {
  try {
    const { data } = await get(url);
    return data;
  } catch (error) {
    logger.error("Error while getting html from url -> ", error);
  }
};

export default resolvers;
