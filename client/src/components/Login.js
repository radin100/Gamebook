import { useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/userService";
import useValues from "../hooks/useValues";
import guestCheck from "../utils/guestCheck";

const Login = ({ user, setUser, setErr }) => {

    const  { values, onChange, navigation }  = useValues({
        email:'',
        password:'',
        stayIn: false
    });

    useEffect(() => {
        try{
            setErr(false);
            guestCheck();
        }catch(err){
            setErr(err);
            navigation(`/profile/${user._id}`);
        }
    }, [ user, values, setErr, navigation]);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setErr(false);
            const user = await login(values);
            setUser(user);

            navigation(`/`);
        }catch(err){
            setErr(err);
        }
    }

    return(
        <form onSubmit={ onSubmit } className="position-absolute top-50 start-50 translate-middle">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={ values.email } onChange={ onChange } type="email" className="form-control" id="inputEmail" name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={ values.password } onChange={ onChange } type="password" className="form-control" id="inputPassword" name="password" />
            </div>
            <button type="submit" disabled={ values.password === '' || values.email === '' } className="btn btn-primary">Submit</button>
            <div className="mb-3 form-check m-1">
                <input type="checkbox" name="stayIn" checked={ values.stayIn } onChange={ onChange } className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Stay logged in?</label>
            </div>
            <div id="accHelp" className="form-text text-secondary-emphasis">Don't have an account? Click <Link className="text-secondary-emphasis" to='/register'>here</Link> to create a new one!</div>
        </form>
    );
}

export default Login;