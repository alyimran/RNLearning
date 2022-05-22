import { useEffect } from "react"

Lifecycle methods of class
1:Mounting
constructor()
componentWillMount()
render()
componentDidMount()
useEffect(()=>{
    console.log("something");
    return ()=>{
        console.log("Clean up");
    }
    },[anyVarriable])

2:Updation
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()
useEffect(()=>{
    console.log("something");
    return ()=>{
        console.log("Clean up");
    }
    },[anyVarriable])

3:Unmounting:
componentWillUnmount() 
useEffect(()=>{
console.log("something");
return ()=>{
    console.log("Clean up");
}
},[])