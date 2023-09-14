import { getUser } from "./userSession";
import { getUserLocally } from "./userLocal";

const ownerCheck = (game) => {
    const user = getUser() || getUserLocally();

    if(user === null){
        throw new Error('There\'s no user logged in!');
    }
    
    if(user._id !== game._ownerId){
        throw new Error('Only game\'s owner can reach this page!');
    }
}

export default ownerCheck;