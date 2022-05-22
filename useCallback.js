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

Example 2, without useCallback, Bad (But eslint-plugin-react-hook would give you warning to correct it):

function MyApp() {
  function foo() {
    // do something with state or props data
  }
  useEffect(() => {
    // do something with foo
    // maybe fetch from API and then pass data to foo
    foo()
  }, [foo])
  return <>...<>
}
{/* //Example 2, with useCallback, Good: */}

function MyApp() {
  const memoizedFoo = useCallback(function foo() {
    // do something with state or props data
  }, [ /* related state / props */])

  useEffect(() => {
    // do something with memoizedFoo
    // maybe fetch from API and then pass data to memoizedFoo
    memoizedFoo()
  }, [memoizedFoo])
  return <>...<>
}