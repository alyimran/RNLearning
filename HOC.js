import { useState } from "react"

HOC
A function which takes a component as an input and returns an extented version of it.
const newComponent = HOC(originalComponent);
Hoc adds additioanl data or functionality to originalComponent


Why HOC ?
To share common functionality between components.


const withCounter = (WrappedComponent , incrementNumber) => {
    [count, setcount] = useState(0)
    const incrementCount = () =>{}
    const hocComponent = ({...props}) => <WrappedComponent firstMame = "ali" count = {count} setcount = {setcount}
    {...props}/>
  
    hocComponent.propTypes = {}
  
    return hocComponent
  }

  export default withCounter;

  here our HOC is inserting a firstMame , setcount and count as  prop in any component that it gets as input.

  const testhoc =  function(props) {
    return (
      <View>
        <Text>{props.firstName}</Text>
      </View>
    )
  }
  export default withCounter(testhoc)

  Alawys remember to pass down the props in hoc as in line number 17 else we will not access any props which 
  are passed to wrapped component 

  we can also pass parameters to HOC as in line number 13


  HOC is just a pattern, which means that it's not written in stone that 
  you have to use class components to write them.

  Hooks give us the ability to handle state and side effects in our functional components 
  and our functional-based HOCs, 
  but if you're like me and prefer to use functional components and your HOC uses hooks to 
  work, why not create a custom hook instead?