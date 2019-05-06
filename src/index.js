import React from "react";

export function withMount(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      this.isMount = true;
    }
    
    componentWillUnmount() {
      this.isMount = false;
    }

    render() {
      return <WrappedComponent {...this.props} isMount={this.isMount}/>;
    }
  }
}

export default {};