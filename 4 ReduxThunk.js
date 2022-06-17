Writing Async Logic with Thunks:
So far, all the logic in our application has been synchronous. Actions are dispatched, the store runs the
reducers and calculates the new state, and the dispatch function finishes. But, the JavaScript language
has many ways to write code that is asynchronous, and our apps normally have async logic for things like
fetching data from an API. We need a place to put that async logic in our Redux apps.

A thunk is a specific kind of Redux function that can contain asynchronous logic. Thunks are written using two
functions:

An inside thunk function, which gets dispatch and getState as arguments
The outside creator function, which creates and returns the thunk function


// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    }, 1000)
  }


We can use them the same way we use a typical Redux action creator:
store.dispatch(incrementAsync(5))

However, using thunks requires that the redux-thunk middleware (a type of plugin for Redux)
be added to the Redux store when it's created. Fortunately, Redux Toolkit's configureStore 
function already sets that up for us automatically, so we can go ahead and use thunks here.


When you need to make AJAX calls to fetch data from the server, you can put that call in a thunk. 
Here's an example that's written a bit longer, so you can see how it's defined:

// the outside "thunk creator" function
const fetchUserById = userId => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
      try {
        // make an async call in the thunk
        const user = await userAPI.fetchById(userId)
        // dispatch an action when we get the response back
        dispatch(userLoaded(user))
      } catch (err) {
        // If something went wrong, handle it here
      }
    }
  }


Detailed Explanation: Thunks and Async Logic

We know that we're not allowed to put any kind of async logic in reducers. But, that logic has to live somewhere.

If we have access to the Redux store, we could write some async code and call store.dispatch() when we're done:

const store = configureStore({ reducer: counterReducer })

setTimeout(() => {
  store.dispatch(increment())
}, 250)

But, in a real Redux app, we're not allowed to import the store into other files, especially in our React c
omponents, because it makes that code harder to test and reuse.

In addition, we often need to write some async logic that we know will be used with some store, eventually,
 but we don't know which store.

The Redux store can be extended with "middleware", which are a kind of add-on or plugin that can add extra 
abilities. The most common reason to use middleware is to let you write code that can have async logic, 
but still talk to the store at the same time. They can also modify the store so that we can call dispatch()
 and pass in values that are not plain action objects, like functions or Promises.

The Redux Thunk middleware modifies the store to let you pass functions into dispatch.



Using Middleware to Enable Async Logic

By itself, a Redux store doesn't know anything about async logic. It only knows how to synchronously
dispatch actions, update the state by calling the root reducer function, and notify the UI that something
has changed. Any asynchronicity has to happen outside the store.

But, what if you want to have async logic interact with the store by dispatching or checking the c
urrent store state? That's where Redux middleware come in. They extend the store, and allow you to:

Execute extra logic when any action is dispatched (such as logging the action and state)
Pause, modify, delay, replace, or halt dispatched actions
Write extra code that has access to dispatch and getState
Teach dispatch how to accept other values besides plain action objects, such as functions and promises, 
by intercepting them and dispatching real action objects instead

The most common reason to use middleware is to allow different kinds of async logic to interact
with the store


Thunk Functions:
Once the thunk middleware has been added to the Redux store, it allows you to pass thunk functions
 directly to store.dispatch. A thunk function will always be called with (dispatch, getState) as 
 its arguments, and you can use them inside the thunk as needed.

Thunks typically dispatch plain actions using action creators, like dispatch(increment()):

const store = configureStore({ reducer: counterReducer })

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter}`)
  dispatch(increment())
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter}`)
}

store.dispatch(exampleThunkFunction)

For consistency with dispatching normal action objects, we typically write these as thunk action creators, 
which return the thunk function. These action creators can take arguments that can be used inside the thunk.

const logAndAdd = amount => {
    return (dispatch, getState) => {
      const stateBefore = getState()
      console.log(`Counter before: ${stateBefore.counter}`)
      dispatch(incrementByAmount(amount))
      const stateAfter = getState()
      console.log(`Counter after: ${stateAfter.counter}`)
    }
  }
  
  store.dispatch(logAndAdd(5))