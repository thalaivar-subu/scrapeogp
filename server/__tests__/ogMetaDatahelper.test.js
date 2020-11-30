import { formatProperty } from "../helper/ogMetadatahelper";

describe("Testing Util ogMetaDataHelper Methods", () => {
  it(`Testing formatProperty`, () => {
    expect(formatProperty("og:site_name")).toBe("ogSitename");
  });
});
