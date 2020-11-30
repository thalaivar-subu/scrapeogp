import logger from "../utils/logger";
import { load } from "cheerio";
import { isValidArray } from "../utils/common";
import { formatProperty, getHtmlFromUrl } from "../helper/ogMetadatahelper";

const resolvers = {
  Query: {
    // eslint-disable-next-line no-unused-vars
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
            const key = formatProperty(property);

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

export default resolvers;
