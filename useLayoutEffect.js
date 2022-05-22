//UseEffect and useLayoutEffect are alomost identical
//With only a minor difference
//UseEffect is called only after the stuff is shown on the screen, 
//or the layout is painted on the screen.
//While UseLayoutEffect is called before the stuff is painted onto the screen.


// For example, if we have an input and it's value is set to "ali"
// and we want to change its value in useEffect as follow
const myComponent =()=>{
const inputRef = useRef(null)
useEffect(()=>{
    inputRef.current.value = "Imran"
},[]);

return (
    <>
    <Input ref = {inputRef}/>
    </>
);
}

// we will see that for a split second we will see ali and after that imran will appear because
// useEffect is called after the painting on the screen

// if we do that with useLayoutEffect, 
// we will see Imran directly on the screen as useLayoutEffect is directly before painting 
// on the screen.

