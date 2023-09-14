import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById, update } from "../services/gameService";
import useValues from "../hooks/useValues";
import ownerCheck from "../utils/ownerCheck";

const Edit = ({ user, setErr }) => {
    const id = useParams().id;

    const  { values, onChange, navigation, setValues }  = useValues({
        name:'',
        description: '',
        img: ''
    });

    useEffect(() => {
            getById(id)
            .then(game => {
                ownerCheck(game);
                setValues(game);
            })
            .catch(err => {
                navigation('/')
                setErr(err);
            })
            .finally(setErr(false));
        }, [ id, setValues, navigation, setErr ]);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setErr(false);
    
            await update(id, values, user._id);

            navigation(-1);
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
            <div id="accHelp" className="form-text text-secondary-emphasis">Please don't leave empty inputs.</div>
        </form>
    );
}

export default Edit;