import { getUser } from "./userSession";
import { getUserLocally } from "./userLocal";

const userCheck = () => {
    if(getUser() === null && getUserLocally() === null){
        throw new Error('Only logged in user can reach this page!');
    }
}

export default userCheck;