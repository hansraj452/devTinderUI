

import io from 'socket.io-client'
import { CONSTANT} from "./constant.js"


export const createSocketConnection = () =>{
    if(location.hostname === "localhost"){
        return io(CONSTANT.BASE_URL)
    }
    else{
        return io('/' , {path : "/api/socket.io"})
    }
   
}
