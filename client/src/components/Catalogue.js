import { useState, useEffect } from "react";
import { getAll } from "../services/gameService";
import GameCard from "./GameCard";

const Catalogue = ({ setErr }) => {
    const [ games, setGames] = useState([]);
    const [ filtered, setFiltered ] = useState([]);

    useEffect(() => {
        getAll()
        .then(games => {
            setGames(games); 
            setFiltered(games);
        })
        .finally(setErr(false))
    }, [ setErr ]);

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    const onChange = async (e) => {

        const values = Object.fromEntries(new FormData(e.target.parentElement));
        const filteredGames = games.filter(game => game.name.toLowerCase().includes(values.name.toLowerCase()) && (values.genre === game.genre || values.genre === ''));
        setFiltered(filteredGames);
    }

    return(
        <div>
            <h1 className="text-success text-center m-5 fw-bold">
                    Game ideas catalogue
            </h1>
            <form onSubmit={ onSubmit } className="d-flex justify-content-center" role="search">
                <input onChange={ onChange }className="form-control me-2 w-25 m-3" name="name" type="search" placeholder="Search" aria-label="Search" />
                <select name="genre" id="genre" className="h-100 mt-4" onChange={ onChange }>
                    <option value="">All genres</option>
                    <option value="Role-Playing">Role-Playing</option>
                    <option value="Survival">Survival</option>
                    <option value="Racing/Simulation">Racing/Simulation</option>
                    <option value="Other">Other</option>
                </select>
            </form>
            <div className="d-flex flex-wrap mb-3 text-center justify-content-center">
                { filtered.length > 0
                ? filtered.map(game => <GameCard key={ game._id } game={ game } />)
                :    <div>There are no games for you :( </div>
                }
            </div>
        </div>
    );
}

export default Catalogue;