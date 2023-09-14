import { useEffect } from "react";
import { create } from "../services/gameService";
import useValues from "../hooks/useValues";
import userCheck from "../utils/userCheck";


const Add = ({ user, setErr }) => {
    const  { values, onChange, navigation }  = useValues({
        name:'',
        genre: '',
        description: '',
        img:''
    });

    useEffect(() => {
        try{
            userCheck();
            setErr(false);
        }catch(err){
            navigation('/');
            setErr(err);
        }
    }, [ values, navigation, setErr ]);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setErr(false);
    
            await create({ ...values, _ownerId: user._id });

            navigation(`/profile/${user.username}`);
        }catch(err){
            setErr(err);
        }
    }

    return(
        <form onSubmit={ onSubmit } className="position-absolute top-50 start-50 translate-middle">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input value={ values.name } onChange={ onChange } type="text" className="form-control" id="inputName" name="name" />
            </div>
            <div className="mb-3 d-flex flex-column">
                <label htmlFor="genre" className="form-label">Select game genre</label>
                <select name="genre" id="genre" onChange={ onChange }>
                    <option value="">No genre</option>
                    <option value="Role-Playing">Role-Playing</option>
                    <option value="Survival">Survival</option>
                    <option value="Racing/Simulation">Racing/Simulation</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                <textarea value={ values.description } onChange={ onChange } type="text" className="form-control" id="inputDescription" name="description" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Image URL</label>
                <input value={ values.img } onChange={ onChange } type="url" className="form-control" id="inputImageURL" name="img" />
            </div>
            <button type="submit" disabled={ values.name === '' || values.description === '' || values.img === '' } className="btn btn-primary">Submit</button>
            <div id="accHelp" className="form-text text-secondary-emphasis">Please fill all inputs.</div>
        </form>
    );
}

export default Add;