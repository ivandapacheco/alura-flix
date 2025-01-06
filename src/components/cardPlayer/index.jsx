import PropTypes from 'prop-types';
import styles from './CardPlayer.module.css';

const CardPlayer = ({ id, name, lastName, position, value, img, editPlayer, deletePlayer  }) => {
  return (
    <div className={`card mb-4 text-white shadow-sm col-lg-3 col-md-4 col-sm-5 col- ${styles['jugador-card']}`}>
      <img src={img} className={`card-img-top ${styles['jugador-img']}`} alt={`Imagen de ${name} ${lastName}`} />
      <div className={`card-body ${styles['jugador-info']}`}>
        <h5 className="card-title text-center text-white mb-1">
          {name} <span className="fw-bold">{lastName}</span>
        </h5>
        <p className="card-text text-center text-light mb-3">{position}</p>
        <div className="text-center">
          <span className="badge bg-warning text-dark">Valor de Mercado: €{value} Mill</span>
        </div>
      </div>

      {/* Contenedor de botones */}
      <div className={`position-absolute top-50 start-50 translate-middle rounded p-4 ${styles['card-buttons']}`}>
        <div className="row gap-3 p-0 m-0">
          
          {/* Botón de Editar */}
          <div className="btn col-12 d-flex align-items-center p-2 edit-button" onClick={() => editPlayer(id)}>
            <i className="fa-solid fa-pen-to-square fs-4 me-2 text-success"></i>
            <span className="text-light fw-bold">Editar</span>
          </div>

          {/* Botón de Eliminar */}
          <div className="btn delete-button col-12 d-flex align-items-center p-2" data-id={id} onClick={() => deletePlayer(id)}>
            <i className="fa-solid fa-trash-can fs-4 me-2 text-danger"></i>
            <span className="text-light fw-bold">Eliminar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
CardPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  editPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
};

export default CardPlayer;
