import { getUser } from "./userSession";
import { getUserLocally } from "./userLocal";

const guestCheck = () => {
    
    const user = getUser() || getUserLocally();

    if(user !== null){
        throw new Error('User already logged in!');
    }
}

export default guestCheck;