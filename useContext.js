// 1. What is Context API?

// Context provides a way to pass data through the component tree without having to pass
//  props down manually at every level. by source

// Context API provides clean and easy way to share state between the components without 
//  the props by React itself.

// 2. Building Block of Context API

// We can divide Context API in to three parts.

// Context
// Provider
// Consumer

// 2.1 Context
// There can be multiple context in a single application.

// export default React.createContext({
//     data:'test'
// })

// or
// export default React.createContext1("Ali"))


// 2.2 Provider
// After create context, Provider Provides the capability to access context which wrapped 
// from it. It provides the data and functions to pass down to all the components.
// state = {
//     data = 'test'
// }
// render(){
//   return (
//       <Context.Provider value = {{data:this.state.data}}>
//           {this.props.children}
//       </Context.Provider>
//   );  
// }


// useContext 
// Accepts a context object (the value returned from React.createContext) and returns the 
// current context value for that context. The current context value is determined by the 
//  prop of the nearest <MyContext.Provider> above the calling component in the tree.

// When the nearest <MyContext.Provider> above the component updates, this Hook will 
// trigger a rerender with the latest context value passed to that MyContext provider. 
// Even if an ancestor uses React.memo or shouldComponentUpdate, a rerender will still 
// happen starting at the component itself using useContext.

// A component calling useContext will always re-render when the context value changes. 
// If re-rendering the component is expensive, you can optimize it by using memoization.

// Tip

// If you’re familiar with the context API before Hooks, useContext(MyContext) is equivalent 
// to static contextType = MyContext in a class, or to <MyContext.Consumer>.

// useContext(MyContext) only lets you read the context and subscribe to its changes.
//  You still need a <MyContext.Provider> above in the tree to provide the value for 
//  this context.

const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  };
  
  const ThemeContext = React.createContext(themes.light);
  
  function App() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
  
  function Toolbar(props) {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }
  
  function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
      <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!
      </button>
    );
  }



  import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    username: "John Doe"
  });

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };


function Main() {
    return (
      <div className="dashboardContent">
        <UserProvider>
          <TopNav />
          <Page />
        </UserProvider>
      </div>
    );
  }





