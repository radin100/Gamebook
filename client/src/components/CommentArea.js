import { Link } from "react-router-dom";
import { sendComment } from "../services/gameService";
import useValues from "../hooks/useValues";

const CommentArea = ({ comments, setComments, username, gameId, setErr }) => {
    const { values, onChange, navigation, setValues } = useValues({
        text:''
    });

    const onSubmit = async(e) => {
        e.preventDefault();
        
        try{
            if(username === 'guest'){
                throw new Error('Only registered users can like, dislike, and comment!');
            }

                const game = await sendComment(gameId, {
                authorUsername: username,
                text: values.text
            })
            setComments(game.comments);
            setValues({ text:'' });
            navigation(0);
        }catch(err){
            setErr(err);
        }
    }

    const CommentBox = ({ username, text }) => {
        return <span className=" m-1 w-100 text-break "><Link className="text-reset" to={`/profile/${username}`}>{username}</Link>: {text}</span>
    }

    return(
        <div className="d-flex flex-column m-1 p-2 w-100">
            <form onSubmit={ onSubmit } className="d-flex flex-row">
                <textarea name="text" value={ values.text } onChange={ onChange } placeholder="Add comment..." />
                <button type="submit" className="btn btn-primary m-1">Send</button>
            </form>
            <div className="d-flex flex-column border w-50">
                { comments.map(comment => <CommentBox key={ comment._id } username={ comment.authorUsername } text={ comment.text } />) }
            </div>
        </div>
    );
}

export default CommentArea;