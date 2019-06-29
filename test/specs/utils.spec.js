import { utils } from "../../packages";

describe("utils: check exists", () => {
  it("检查所有方法都存在", () => {
    // text.js
    expect(utils.getOptionName).to.exist;
    expect(utils.YMD).to.exist;
    expect(utils.YMDHms).to.exist;
    expect(utils.formatDate).to.exist;
    expect(utils.formatLongName).to.exist;
    expect(utils.renderLongName).to.exist;
    expect(utils.emptify).to.exist;
    expect(utils.omitStr).to.exist;

    // message.js
    expect(utils.showMessage).to.exist;
    expect(utils.showError).to.exist;
    expect(utils.renderTableIndex).to.exist;

    // url.js
    expect(utils.getPageQuery).to.exist;
    expect(utils.getPagePath).to.exist;
    expect(utils.getQueryPath).to.exist;
    expect(utils.isUrl).to.exist;

    // interval.js
    expect(utils.Interval).to.exist;
  });

  it("检查正确性: formatLongName", () => {
    const emptyString01 = null;
    const opString01 = utils.formatLongName(emptyString01, 4);
    expect(opString01).to.equal(null);

    const emptyString02 = "";
    const opString1 = utils.formatLongName(emptyString02, 4);
    expect(opString1).to.equal("");

    const testStr = "this is set-components";
    const opString03 = utils.formatLongName(testStr, 4);
    expect(opString03).to.equal("this...");

    const opString04 = utils.formatLongName(testStr, 4, "");
    expect(opString04).to.equal("this");
  });
});
