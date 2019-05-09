import React from 'react';

export default WrappedComponent => {
  return class extends React.Component {
    state = {
      isMount: false
    }

    componentDidMount() {
      this.setState({ isMount: true });
    }

    componentWillUnmount() {
      this.setState({ isMount: false });
    }

    render() {
      const { isMount } = this.state;
      return <WrappedComponent {...this.props} isMount={isMount} />;
    }
  };
}
