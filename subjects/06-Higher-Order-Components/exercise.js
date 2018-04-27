////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withMouse(Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = event => {
      this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component
            {...this.props}
            mouse={this.state}
            onMouseMove={this.handleMouseMove}
          />
        </div>
      );
    }
  };
}

function withCat(Component) {
  return class extends React.Component {
    static propTypes = {
      mouse: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    };

    state = { left: 0, top: 0 };

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { mouse } = nextProps;

      setTimeout(() => {
        this.setState({
          left: mouse.x - 50,
          top: mouse.y - 50
        });
      }, 200);
    }

    render() {
      return (
        <div>
          <div className="cat" style={this.state} />
          <Component {...this.props} />
        </div>
      );
    }
  };
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  render() {
    const { mouse } = this.props;

    return (
      <div className="container">
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));