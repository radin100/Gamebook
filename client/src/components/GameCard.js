import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
    return(
        <div className="card m-3" style={{ width: '18rem' }}>
            <img src={ game.img } className="card-img-top h-75" alt={ `${game.name}Img` } />
            <div className="card-body">
                <h5 className="card-title">{ game.name }</h5>
                <Link to={ `/details/${game._id}` } className="btn btn-secondary">Details</Link>
            </div>
        </div>
    );
}

export default GameCard;