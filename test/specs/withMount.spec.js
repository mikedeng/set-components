import { withMount } from "../../packages";

describe("isMount", () => {
  it("子对象的props上isMount设置成功", () => {
    const Child = () => <div />;
    const Parent = withMount(Child);
    const wrapper = mount(<Parent />);
    wrapper.instance().componentDidMount();
    expect(wrapper.state().isMount).to.equal(true);

    const foundChild = wrapper.find("Child");
    expect(foundChild.props().isMount).to.equal(true);
  });
});
