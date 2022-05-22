//Use Memo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);


function computeExpensiveValue(a, b){
    //do some expensive calculations
}
const App = () =>{
    return (
        <View>
            <Text>{memoizedValue}</Text>
        </View>
    );
}
//if we call computeExpensiveValue directly, it will be computed on each render, 
// so we use usMemo to save the value so that it will be not computed on each render only
// when the dependencies are changed.

// Returns a memoized value.

// Pass a “create” function and an array of dependencies. useMemo will only recompute the 
// memoized value when one of the dependencies has changed. This optimization helps to avoid 
// expensive calculations on every render.

// Remember that the function passed to useMemo runs during rendering. Don’t do anything 
// there that you wouldn’t normally do while rendering. For example, side effects belong 
// in useEffect, not useMemo.

// If no array is provided, a new value will be computed on every render.

// Note

// The array of dependencies is not passed as arguments to the function. Conceptually, 
// though, that’s what they represent: every value referenced inside the function should
//  also appear in the dependencies array. In the future, a sufficiently advanced compiler
//   could create this array automatically.