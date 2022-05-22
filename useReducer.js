// Use reducer is used to store and update states just like usestate.

//Use state Vs useReducer
const [state, setState] = useState(initialState)

const [state2, dispatch1] = useReducer(reducer, initialState)


// All useReducer does for us is take an initial state and give us a way to alter 
// that state based on the rules we set. That’s just useState done fancy.

// Yo, useReducer, here’s some state, here are my rules, what does the new state look like?


// useReducer example
const initialState = {
    moneyInBank: 0,
    moneyInSofa: 999,
    billsToPay: 1000
}
const [state1, dispatch] = useReducer(reducer, initialState)

const reducer = (state, action) => {
    switch(action.type){
        case "DEPOSIT MONEY IN BANK":
            return {...state,
                    moneyInBank: state.moneyInBank + action.payload
                   };
        case "PAY SOME BILLS":
            return {...state,
                    billsToPay: state.billsToPay - action.payload
                   };
        case "CLEAN THE SOFA":
            return {...state,
                    moneyInBank: state.moneyInBank
                                 + state.moneyInSofa,
                    moneyInSofa: 0
                   };
    };
}

//Whenever we want to change our complex state in the code we have
// the handy dispatch method to send actions off to the reducer.

dispatch({type: "DEPOSIT MONEY IN BANK", payload: 100});


// What It Is
// useReducer() is a method from the React Hooks API, similar to useState but gives you 
// more control to manage the state. It takes a reducer function and initial state as 
// arguments and returns the state and dispatch method:

const [state4, dispatch4] = React.useReducer(reducerFn, initialState, initFn);


// A reducer is a pure function that takes previous state and
//  action as an argument, and returns the next state.
(prevState, action) => newState


// 3 Reasons to Use It
// Most of the time, you are well covered with just useState() method, which is built on
//  top of useReducer(). But there cases when useReducer() is preferable.

// 1: Next state depends on the previous
// It is always better to use this method when the state depends on the previous one. 
// It will give you a more predictable state transition. The simple example would be:

function reducer(state, action) {
    switch (action.type) {
      case 'ADD': return { count: state.count + 1 };
      case 'SUB': return { count: state.count - 1 };
      default: return state;
    }
  }
  
  function Counter() {
    const [state, dispatch] = React.useReducer(reducer, { count: 0 });
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'ADD'})}>Add</button>
        <button onClick={() => dispatch({type: 'SUB'})}>Substract</button>
      </>
    );
  }
//Note:
// For the first point you can still use State's
// hook functional form: setState(state => state + 1).

//   Complex state shape
// When the state consists of more than primitive values, 
// like nested object or arrays. For example:
const [state5, dispatch5] = React.useReducer(
    fetchUsersReducer,
    {
      users: [
        { name: 'John', subscribred: false },
        { name: 'Jane', subscribred: true },
      ],
      loading: false,
      error: false,
    },
  );

//   It is easier to manage this local state, because the parameters depends from each other 
//   and the all the logic could be encapsulated into one reducer.

// 2:Easy to test
// Reducers are pure functions, and this means they have no side effects and must 
// return the same outcome given the same arguments. It is easier to test them because 
// they do not depend on React.
//  Let's take a reducer from the counter example and test it with a mock state:


test("increments the count by one", () => {
    const newState = reducer({ count: 0 }, { type: "ADD" });
    expect(newState.count).toBe(1)
  })


// useReducer() is an alternative to useState() which gives you more control over the 
// state management and can make testing easier. All the cases can be done with useState()
// method, so in conclusion, use the method that you are comfortable with,
// and it is easier to understand for you and colleagues.

//userReducer is always recommended when state is bigger and complex.