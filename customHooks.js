// A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks.
// When we want to share logic between two JavaScript functions, we extract it to a third
//  function. Both components and Hooks are functions, so this works for them too!
// Hooks are reusable functions.

// When you have component logic that needs to be used by multiple components, 
// we can extract that logic to a custom Hook.


import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}


function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id);
  
    if (isOnline === null) {
      return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
  }



  import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import {navigate} from '../navigatorRef'

export default () => {
    const {createTracks} = useContext(TrackContext)
    const {state:{name, locations} , reset} = useContext(LocationContext)

    const saveTrack = async()=>{
       const result =  await createTracks(name, locations);
       reset();
       navigate("TrackList")
    }
    return [saveTrack];
}