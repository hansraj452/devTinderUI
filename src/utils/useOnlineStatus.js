import { useEffect, useState } from "react";


const useOnlineStatus = () =>{
    const [onlineStatus , setOnlineStatus] = useState(true);
   useEffect(()=>{
    const handleOnline = () =>{
        setOnlineStatus(true)
    };
    const handleOffline = () =>{
        setOnlineStatus(false);
    }
    window.addEventListener('online' , handleOffline);
    window.addEventListener('offline' , handleOffline);

    //clearnup funcion || componentWillUnmount()

    return () =>{
        window.removeEventListener('online' , handleOnline);
        window.removeEventListener('offline' , handleOffline)
    }

   } , [])
    
    return onlineStatus;
}
export default useOnlineStatus