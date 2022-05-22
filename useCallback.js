//Use callback
const memoizedCallback = useCallback(
    () => {
      doSomething(a, b);
    },
    [a, b],
  );

//   Returns a memoized callback.
// Pass an inline callback and an array of dependencies. useCallback will return a memoized
//  version of the callback that only changes if one of the dependencies has changed. 
//  This is useful when passing callbacks to optimized child components that rely on 
//  reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)

// Few common uses, examples:

// 1:Passing memoized functions to child components (that are optimized with React.memo or
// shouldComponentUpdate using shallow equal - Object.is) to avoid unnecessary rerender 
// of child component due to functions passed as props.

// Example 1, without useCallback:

const Child = React.memo(function Child({foo}) {
  console.log('child rendering ...') // Child will rerender (because foo will be new) whenever MyApp rerenders
  return <>Child<>
})

function MyApp() {
  function foo() {
    // do something
  }
  return <Child foo={foo}/>
}


{/* Example 1, with useCallback: */}

const Child = React.memo(function Child({foo}) {
  console.log('child rendering ...') // Child will NOT rerender whenever MyApp rerenders
  // But will rerender only when memoizedFoo is new (and that will happen only when useCallback's dependency would change)
  return <>Child<>
})

function MyApp() {
  function foo() {
    // do something
  }
  const memoizedFoo = useCallback(foo, [])
  return <Child foo={memoizedFoo}/>
}


{/* 2: Passing memoized functions to as dependencies in other hooks. */}