import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import "./addPlayer.css";
import Swal from 'sweetalert2';


const AddPlayer = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    posicion: "",
    valorMercado: "5",
    URL_imagen: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpia el error al escribir
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } es obligatorio`;
      }
    });
    // Validación especial para la posición
    if (!form.posicion) {
      newErrors.posicion = "La posición es obligatoria";
    }
    return newErrors;
  };

 




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Envío: ", form);
    console.log("Envío 2: ", JSON.stringify(form, null, 2));

    try {
      const response = await fetch("https://my-json-server.typicode.com/ivandapacheco/alura-flix-json-server-api/jugadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error();
      }

      // Mostrar notificación de éxito si la operación fue exitosa
      await Swal.fire({
        icon: 'success',
        html: `
          <h3 class="container text-center fw-bold">¡Bienvenido a la familia culé!</h3>
          <img class="mt-3" src="assets/logo.png" alt="Logo Barcelona" style="height: 70px;">
          <span class="d-block fst-italic mt-3">${form.nombre} ${form.apellido}</span>
          <p><span class="fw-bold fs-7 mt-3 mb-0">¡El F.C Barcelona está orgulloso de tenerte!</span></p>
        `,
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Acción cuando el usuario presiona "Aceptar"
          // Redirigir a la lista de jugadores
          navigate("/");
        }
      });;

      
    } catch (error) {
      console.error("Error al añadir jugador:", error);

      // Mostrar notificación de error
      Swal.fire({
        icon: 'error',
        title: 'Oops 😔',
        text: 'Hubo un problema al añadir el jugador. Inténtalo de nuevo más tarde.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const posiciones = [
    { value: "Portero", label: "Portero" },
    { value: "Defensa", label: "Defensa" },
    { value: "Centrocampista", label: "Centrocampista" },
    { value: "Delantero", label: "Delantero" },
  ];
  
  const handleGoBack = () => {
    navigate("/"); // Redirige a Home
  };

  return (
    <div className="page-transition">
      <h2 className={`text-center fw-bold p-2 bg-grana`} >Añadir Nuevo Jugador</h2>

      <div className="ms-2 mt-3 mb-4">
        <button
          type="button"
          className="btn btn-return btn-sm px-3 fw-semibold"
          onClick={handleGoBack}
        >
          <i className="fa fa-arrow-circle-left"></i>   Volver
        </button>
      </div>
      
      <div className="container">
        <h2 className="text-center fw-semibold"></h2>

        <div className="container border rounded-5 px-lg-3 py-lg-4 mb-5">
          <form onSubmit={handleSubmit} className="mt-4 ">
            <div className="row justify-content-center ">
              <div className="row col-lg-4 mb-3  align-items-center ">
                <div className="row col-lg-2 col-md-1 col-sm-2 col-2 ">
                  <i className="fas fa-user me-2"></i>
                </div>

                <div className="col-lg-10 col-md-11 col-sm-10 col-10 ps-lg-4 ps-xl-2">
                  <TextField
                    id="standard-basic"
                    label="Nombre"
                    name="nombre"
                    variant="standard"
                    size="small"
                    value={form.nombre}
                    onChange={handleChange}
                    fullWidth
                    color="grana"
                    // error={!!errors.nombre}
                    // helperText={errors.nombre}
                  />
                </div>
              </div>

              {/* Apellido */}
              <div className="row col-lg-4 mb-3 align-items-center">
                <div className="row col-lg-2 col-md-1 col-sm-2 col-2">
                  <i className="fas fa-user-circle me-2"></i>
                </div>

                <div className="col-lg-10 col-md-11 col-sm-10 col-10 ps-lg-4 ps-xl-2">
                  <TextField
                    label="Apellido"
                    id="standard-size-small"
                    // defaultValue=""
                    name="apellido"
                    size="small"
                    variant="standard"
                    value={form.apellido}
                    onChange={handleChange}
                    fullWidth
                    color="grana"
                    error={!!errors.apellido}
                    helperText={errors.apellido}
                  />
                </div>
              </div>

              {/* Foto del jugador */}
              <div className="row col-lg-4 mb-3 align-items-center">
                <div className="row col-lg-2 col-md-1 col-sm-2 col-2">
                  <i className="fas fa-image me-2"></i>
                </div>

                <div className="col-lg-10 col-md-11 col-sm-10 col-10 ps-lg-4 ps-xl-2">
                  <TextField
                    label="URL Foto del jugador"
                    id="standard-size-small"
                    // defaultValue=""
                    name="URL_imagen"
                    size="small"
                    variant="standard"
                    value={form.URL_imagen}
                    onChange={handleChange}
                    fullWidth
                    color="grana"
                    error={!!errors.URL_imagen}
                    helperText={errors.URL_imagen}
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-lg-4 ">
              {/* Posición */}
              <div className="row col-lg-4 mb-3 align-items-center ">
                <div className="row col-lg-2 col-md-1 col-sm-2 col-2">
                  <i className="fas fa-map-marker-alt me-2"></i>
                </div>

                <div className="col-lg-10 col-md-11 col-sm-10 col-10 ps-lg-4 ps-xl-2">
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120 }}
                    fullWidth
                  >
                    <InputLabel
                      id="demo-simple-select-standard-label"
                      color="grana"
                    >
                      Posición
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="posicion"
                      value={form.posicion}
                      onChange={handleChange}
                      label="Posición"
                      color="grana"
                      error={!!errors.posicion}
                      helperText={errors.posicion}
                    >
                      {posiciones.map((posicion) => (
                        <MenuItem key={posicion.value} value={posicion.value}>
                          {posicion.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.posicion && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1 }}
                      >
                        {errors.posicion}
                      </Typography>
                    )}
                  </FormControl>
                </div>
              </div>

              {/* Valor de Mercado */}
              <div className="row col-lg-8 mb-3 align-items-center  ">
                <div className="row col-lg-1 col-md-1 col-sm-2 col-2">
                  <i className="fas fa-tag me-2"></i>
                </div>

                <div className="col-lg-11 col-md-11 col-sm-10 col-10 ps-lg-4 ps-xl-4">
                  <Box fullWidth>
                    <Typography id="non-linear-slider" gutterBottom>
                      Valor de Mercado (€):<b>{form.valorMercado}</b> M
                    </Typography>
                    <Slider
                      value={form.valorMercado}
                      min={5}
                      name="valorMercado"
                      step={1}
                      max={150}
                      valueLabelFormat={(value) => `${value} Mill`}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="non-linear-slider"
                      color="grana"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: -1,
                      }}
                    >
                      <Typography variant="caption">Mín: 5M</Typography>
                      <Typography variant="caption">Máx: 150M</Typography>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-2 mb-3 mb-lg-0">
              <button type="submit" className="btn btn-sm btn-send">
                <i className="fas fa-user-plus"></i> Añadir Jugador
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlayer;
