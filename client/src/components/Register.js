import { useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/userService";
import useValues from "../hooks/useValues";
import guestCheck from "../utils/guestCheck";

const Register = ({ user, setUser, setErr }) => {

    const  { values, onChange, navigation }  = useValues({
        username:'',
        email: '',
        password:'',
        repassword: ''
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
    
            const user = await register(values);
            setUser(user);
            
            navigation('/');
        }catch(err){
            setErr(err);
        }
    }

    return(
        <form onSubmit={ onSubmit } className="position-absolute top-50 start-50 translate-middle">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input value={ values.username } onChange={ onChange } type="text" className="form-control" id="inputUsername" name="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={ values.email } onChange={ onChange } type="email" className="form-control" id="inputEmail" name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={ values.password } onChange={ onChange } type="password" className="form-control" id="inputPassword" name="password" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Repassword</label>
                <input value={ values.repassword } onChange={ onChange } type="password" className="form-control" id="inputRepassword" name="repassword" />
                <div id="emailHelp" hidden={ values.password === values.repassword } className="form-text text-danger">Passwords are not the same!</div>
            </div>
            <button type="submit" disabled={ values.password !== values.repassword || values.password === '' || values.username === '' || values.email === '' } className="btn btn-primary">Submit</button>
            <div id="accHelp" className="form-text text-secondary-emphasis">Already have an account? Click <Link className="text-secondary-emphasis" to='/login'>here</Link> to login!</div>
        </form>
    );
}

export default Register;