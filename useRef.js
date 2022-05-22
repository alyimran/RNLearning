//It us used whenever you want to get a reference to a dom element or view element
// in case of react-native, e.g button e.t.c and want to change it's properties

import { useImperativeHandle } from "react";

const refContainer = useRef(initialValue);

// useRef returns a mutable ref object whose .current property is initialized to the passed 
// argument (initialValue). The returned object will persist for the full lifetime of the 
// component.

// A common use case is to access a child imperatively:

function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }

  // useRef is also used in another scenario where you want to change the state of a 
  // child component from parrent component without having move that state from child to parrent
  // To achive that, we have to use another hook
  useImperativeHandle();

  function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }));
    return <input ref={inputRef} />;
  }
  FancyInput = forwardRef(FancyInput);

//   In this example, a parent component that renders <FancyInput ref={inputRef} /> 
//   would be able to call inputRef.current.focus().


// The useRef Hook allows you to persist values between renders.

// It can be used to store a mutable value that does not cause a re-render when updated.

// It can be used to access a DOM element directly.

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

