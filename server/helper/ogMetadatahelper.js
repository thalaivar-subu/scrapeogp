import { get } from "axios";
import logger from "../utils/logger";
// Fetches html body from given endpoint
export const getHtmlFromUrl = async (url) => {
  try {
    const { data } = await get(url);
    return data;
  } catch (error) {
    logger.error("Error while getting html from url -> ", error);
  }
};

// og:site_name -> ogSiteName
export const formatProperty = (property) => {
  return `og${property
    .charAt(property.indexOf(":") + 1)
    .toUpperCase()}${property.slice(property.indexOf(":") + 2)}`.replace(
    /[^a-zA-Z ]/g,
    ""
  );
};
