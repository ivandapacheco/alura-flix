import PropTypes from "prop-types";
import CardPlayer from "../cardPlayer";
import styles from "./categryPlayer.module.css";

const CategoryPlayer = ({ position, players, deletePlayer, editPlayer }) => {
  return (
    // <div className='container '>
    <div className="mb-5 py-3">
      <h3
        className={`text-center fw-semibold text-uppercase fs-3 text-decoration-underline mb-3 ${styles["orbitron"]}`}
      >
        {position}S
      </h3>
      <div className="container d-flex gap-3 flex-wrap justify-content-center   bg-succes">
        {players.map((player) => (
          <CardPlayer
            key={player.id}
            id={player.id}
            name={player.nombre}
            lastName={player.apellido}
            position={player.posicion}
            value={player.valorMercado}
            img={player.URL_imagen}
            deletePlayer={deletePlayer}
            editPlayer={editPlayer}
          />
        ))}
      </div>
    </div>
    // </div>
  );
};

CategoryPlayer.propTypes = {
  position: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  editPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
};

export default CategoryPlayer;
