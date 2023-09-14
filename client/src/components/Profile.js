import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllByOwnerUsername } from "../services/gameService";
import GameCard from "./GameCard";


const Profile = ({ user, setErr }) => {
    const [ games, setGames ] = useState([]);
    const username = useParams().username;

    useEffect(() => {
        getAllByOwnerUsername(username)
        .then(games => setGames(games))
        .finally(setErr(false));

    }, [ setErr ]);

    return(
        <div>
            <h1 className="text-success text-capitalize m-5 fw-bold">
                { user.username === username
                ?   'your profile'
                :   `${username} profile page`
                }
            </h1>

            <div className="d-flex flex-wrap mb-3 text-center justify-content-center">
                {games.length > 0
                ?   games.map(game => <GameCard key={ game._id } game={ game } />)
                :   <div>You have no posted games yet.</div>
                }
            </div>
            
                
            <div>
                { user.username === username
                ?   <Link to='/create'><button type="button" className="btn btn-success float-end m-5">Add new Game</button></Link>
                :   <Link to={-1}><button type="button" className='btn btn-dark float-end m-5'>Back</button></Link>
                }
            </div>
        </div>
    );
}

export default Profile;