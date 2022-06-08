The term render prop refers to a technique for sharing code between react components using a
prop whose value is function.

A component with a render prop takes a function that returns a React element and calls it 
instead of implementing its own render logic.

<DataProvider render={data => (
    <h1>Hello {data.target}</h1>
  )}/>

Libraries that use render props include React Router, Downshift and Formik.

Example:
rop that it uses to dynamically determine what to render–a render prop.

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}


// Render children example
class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
  }
  
  class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
  
          {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
          {this.props.children(this.state)}
        </div>
      );
    }
  }
  
  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <Mouse>
          {mouse => (
            <Cat mouse={mouse} />
          )}
          </Mouse>
        </div>
      );
    }
  }



Caveats
Be careful when using Render Props with React.PureComponent
Using a render prop can negate the advantage that comes from using React.PureComponent 
if you create the function inside a render method. This is because the shallow prop comparison 
will always return false for new props, and each render in this case will generate a new value for 
the render prop.

For example, continuing with our <Mouse> component from above, if Mouse were to extend 
React.PureComponent instead of React.Component, our example would look like this:

class Mouse extends React.PureComponent {
  // Same implementation as above...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          This is bad! The value of the `render` prop will
          be different on each render.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
In this example, each time <MouseTracker> renders, it generates a new function as 
the value of the <Mouse render> prop, thus negating the effect of <Mouse> extending
 React.PureComponent in the first place!

To get around this problem, you can sometimes define the prop as an instance method, like so:

class MouseTracker extends React.Component {
  // Defined as an instance method, `this.renderTheCat` always
  // refers to *same* function when we use it in render
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
In cases where you cannot define the prop statically (e.g. 
because you need to close over the component’s props and/or state) 
<Mouse> should extend React.Component instead.