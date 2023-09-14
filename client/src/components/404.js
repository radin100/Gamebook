import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <h1 className=" position-absolute top-50 start-50 translate-middle text-center fs-1 fw-bolder w-100">
            Page was not found(Error 404). Back to <Link to='/'>home</Link>?
        </h1>
    );
}

export default NotFound;