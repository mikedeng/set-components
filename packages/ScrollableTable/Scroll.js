import React from 'react';

class Scroll extends React.Component {
  state = {
    rollClass: '',
  };

  componentDidMount() {
    const { stop = false, height, width, direction = 'vertical', speed = 35 } = this.props;
    const scrollClass = this.setScrollStyle(
      direction === 'vertical' ? height : width || 300,
      speed
    );
    if (!stop) {
      this.setState({
        rollClass: scrollClass,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { speed: oldSpeed = 35, stop: oldStop } = this.props;
    const { stop = false, height, width, direction = 'vertical' } = nextProps;
    const scrollClass = this.setScrollStyle(
      direction === 'vertical' ? height : width || 300,
      oldSpeed
    );

    if (oldStop !== nextProps.stop && !stop) {
      this.setState({
        rollClass: scrollClass,
      });
    }
  }

  setScrollStyle = (offsetValue, speed) => {
    const { direction = 'vertical' } = this.props;
    const uid = Math.random()
      .toString(36)
      .substr(2);
    const style = document.createElement('style');
    style.type = 'text/css';

    if (direction === 'vertical') {
      style.innerHTML = `
      @keyframes rowup${uid} {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(0, -50%, 0);
        }
      }
      .rowup-${uid}{
        animation: ${Math.floor((offsetValue * 1000) / speed)}ms rowup${uid} linear infinite normal;
      }
      .rowup-${uid}:hover {
        animation-play-state: paused;
      }
      `;
    } else {
      style.innerHTML = `
      @keyframes rowup${uid} {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(-50%, 0, 0);
        }
      }
      .rowup-${uid}{
        animation: ${Math.floor((offsetValue * 1000) / speed)}ms rowup${uid} linear infinite normal;
      }
      .rowup-${uid}:hover {
        animation-play-state: paused;
      }
      `;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    return `rowup-${uid}`;
  };

  render() {
    const { rollClass } = this.state;
    const { stop = false, style, direction = 'vertical', height, width, children } = this.props;
    return (
      <div className="scroll" style={{ width, height, overflow: 'hidden', ...style }}>
        <div
          className={['scroll-content', rollClass].join(' ')}
          style={direction === 'horizon' ? { display: 'inline-flex', width: 'auto' } : {}}
        >
          {children}
          {!stop && children}
        </div>
      </div>
    );
  }
}

export default Scroll;
