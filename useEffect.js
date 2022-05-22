// useEffect hook is just a function that gets called whenever the page re-renders 

function myFunc (){
    useEffect(()=>{
        console.log("hi there");
    });
}

// Now , whenever the  page gets rendered, the above function will keep on getting called and
//hi there will keep on logging. Or, whenver any state changes, the component will 
// re-render and this function will keep on getting called.


// so to  solve that, we can pass [] as second arguement to myFunc 
function myFunc (){
    useEffect(()=>{
        console.log("hi there");
    }, []);
}

// If i want to call the function inside useEffect whenever certain state changes, i can
// do that by passing that state as dependency in the arraylist as second argument

function myFunc (){
    useEffect(()=>{
        console.log("hi there");
    }, [count]);
}

// and if i want to cleanup when the page get out of focus or destroyed, i can return a function
// from useEffect which will be called when the useEffect gets destroyed

function myFunc (){
    useEffect(()=>{
        console.log("hi there");
        return ( ()=>{
            console.log("cleanup on change of count props");
         });
    }, [count]);
}