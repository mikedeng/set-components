import { Checkbox } from "../../packages";

describe("Checkbox Component", () => {
  it("set and get component props", () => {
    const wrapper = shallow(<Checkbox indeterminate={true} checked={false} />);

    const { indeterminate, checked } = wrapper.props();
    expect(indeterminate).to.equal(true);
    expect(checked).to.equal(false);
  });

  it("set and get component props2", () => {
    const wrapper = shallow(<Checkbox indeterminate={false} checked={false} />);

    const { indeterminate, checked } = wrapper.props();
    expect(indeterminate).to.equal(false);
    expect(checked).to.equal(false);
  });

  it("set and get component props3", () => {
    const wrapper = shallow(<Checkbox indeterminate={false} checked={true} />);

    const { indeterminate, checked } = wrapper.props();
    expect(indeterminate).to.equal(false);
    expect(checked).to.equal(true);
  });
});
