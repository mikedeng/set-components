import withMount from "../../src/withMount";

describe('isMount', () => {
  it('子对象的props上isMount设置成功', () => {
    const Child2 = () => <div />
    const Parent = withMount(Child2);
    const wrapper = mount(<Parent />);
    wrapper.instance().componentDidMount();
    expect(wrapper.state().isMount).to.equal(true);

    const foundChild = wrapper.find('Child2');
    expect(foundChild.props().isMount).to.equal(true);
  });
});