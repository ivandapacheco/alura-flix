
import { useEffect, useState } from "react";
import ModalEditPlayer from "../../components/modalEditPlayer/index.jsx"; // El nuevo componente del modal
import { useNavigate } from "react-router-dom";
import PlayerCategory from "../../components/categoryPlayer";
import styles from "./home.module.css";
import Swal from 'sweetalert2';

const Home = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Jugador seleccionado para edición
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  const navigate = useNavigate();

  const handleAddPlayer = () => {
    navigate("/add-player");
  };

  // Función para obtener los jugadores
  const fetchPlayers = async () => {
    try {
      const response = await fetch("https://my-json-server.typicode.com/ivandapacheco/alura-flix-json-server-api/jugadores");
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error al obtener los jugadores:", error);
    }
  };

  const editPlayer = (id) => {
    const player = players.find((player) => player.id === id);
    setSelectedPlayer(player); // Selecciona el jugador
    setIsModalOpen(true); // Abre el modal
  };

  const deletePlayer = async (id) => {
    try {
      const playerToDelete = players.find((player) => player.id === id);
  
      // Confirmación antes de eliminar
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        html: `
          <img class="mt-3" src="src/assets/logo.png" alt="Logo Barcelona" style="height: 70px;">
          <p class="mt-2"><span class="fs-7 mt-3 mb-0">
            ¿Deseas que "<b>${playerToDelete.nombre} ${playerToDelete.apellido}</b>" no se más un culé?
          </p>
          <p class="mt-2" style="font-size:12px">
            <span class="mb-0 text-danger"> * </span>
             Esta acción no se puede deshacer.
          </p>
          
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (result.isConfirmed) {
        // Hacer la solicitud de eliminación
        const response = await fetch(`https://my-json-server.typicode.com/ivandapacheco/alura-flix-json-server-api/jugadores/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Error al eliminar el jugador");
        }
  
        // Actualizar la lista de jugadores en el estado
        const updatedPlayers = players.filter((player) => player.id !== id);
        setPlayers(updatedPlayers);
  
        // Notificación de éxito
        Swal.fire({
          icon: "success",
          title: "¡Jugador eliminado!",
          html: `
            <img class="" src="src/assets/logo-sad.png" alt="Logo Barcelona" style="height: 100px;">
            <p class=""><span class="fs-7 mt-3 mb-0">
              "<b>${playerToDelete.nombre} ${playerToDelete.apellido}</b>" no es más un culé.
            </p>
          `,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al eliminar el jugador:", error);
  
      // Notificación de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al intentar eliminar al jugador. Inténtalo nuevamente.",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
      });
    }
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedPlayer(null); // Limpia el jugador seleccionado
  };

  
// Función para editar
  const handleSaveEdit = async (updatedPlayer) => {
    try {
      const response = await fetch(`https://my-json-server.typicode.com/ivandapacheco/alura-flix-json-server-api/jugadores/${updatedPlayer.id}`, {
        method: "PATCH", // Cambiado a PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayer), // Enviamos solo los campos modificados
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el jugador");
      }
  
      const updatedData = await response.json();
  
      // Actualizar el estado local con los datos actualizados del jugador
      const updatedPlayers = players.map((player) =>
        player.id === updatedPlayer.id ? updatedData : player
      );
      setPlayers(updatedPlayers); // Actualiza la lista de jugadores en el estado
      setIsModalOpen(false); // Cierra el modal
  
      // Mostrar la notificación de éxito
      Swal.fire({
        icon: "success",
        title: "¡Jugador actualizado!",
        html: `
          <img class="mt-3" src="src/assets/logo.png" alt="Logo Barcelona" style="height: 70px;">
          <p class="mt-2"><span class="fs-7 mt-3 mb-0">
            "${updatedPlayer.nombre} ${updatedPlayer.apellido}" ha sido actualizado con éxito.</span>
          </p>
          <p><span class="fw-bold fs-7 mt-3 mb-0">¡Visca el Barça!</span></p>
        `,
        text: `${updatedPlayer.nombre} ${updatedPlayer.apellido} ha sido actualizado con éxito.`,
         showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        timer: 3000
      });
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
  
      // Mostrar la notificación de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al intentar guardar los cambios. Inténtalo nuevamente.",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
      });
    }
  };
  










  useEffect(() => {
    fetchPlayers();
  }, []);

  // Agrupar jugadores por posición
  const groupedPlayers = players.reduce((acc, player) => {
    const position = player.posicion;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(player);
    return acc;
  }, {});

  return (
    <div className="page-transition">
      <h2 className={`text-center fw-bold p-2 ${styles["bg-grana"]}`}>
        Jugadores del FC Barcelona
      </h2>
      <div className="text-end pe-3">
        <button
          type="button"
          className={`btn btn-sm fw-bold ${styles["btn-add"]}`}
          onClick={handleAddPlayer}
        >
          <i className="fas fa-user-plus"></i> Añadir Jugador
        </button>
      </div>
      {Object.keys(groupedPlayers).length > 0 ? (
        Object.entries(groupedPlayers).map(([position, players]) => (
          <PlayerCategory
            key={position}
            position={position}
            players={players}
            editPlayer={editPlayer}
            deletePlayer={deletePlayer}
          />
        ))
      ) : (
        <p>No hay jugadores registrados.</p>
      )}

      {/* Modal de edición */}
      {isModalOpen && (
        <ModalEditPlayer
          player={selectedPlayer}
          onClose={handleModalClose}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Home;
