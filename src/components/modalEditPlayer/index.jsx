import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

const ModalEditPlayer = ({ player, onClose, onSave }) => {
  const [form, setForm] = useState(player);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpia el error al escribir
  };

  const handleSave = () => {
    // Validar los campos
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form); // Llama a la función para guardar
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

  const posiciones = [
    { value: "Portero", label: "Portero" },
    { value: "Defensa", label: "Defensa" },
    { value: "Centrocampista", label: "Centrocampista" },
    { value: "Delantero", label: "Delantero" },
  ];

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"  
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-grana">
            <h5 className="modal-title fw-semibold">Editar Jugador</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body px-5">
            <form>
              {/* Nombre */}
              <div className="mb-3">
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
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
              </div>

              {/* Apellido */}
              <div className="mb-3">
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

              {/* Posición */}
              <div className="mb-3 p-0">
               
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
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.posicion}
                    </Typography>
                  )}
                </FormControl>
              </div>

              {/* Valor de Mercado< */}
              <div className="mb-3">
                {/* <label htmlFor="valorMercado" className="form-label">Valor de Mercado</label>
                <input type="number" className="form-control" id="valorMercado" name="valorMercado" value={form.valorMercado} onChange={handleChange} /> */}
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

            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-return btn-sm fw-semibold px-3"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-send btn-sm"
              onClick={handleSave}
            >
              Actualizar Jugador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalEditPlayer.propTypes = {
  player: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ModalEditPlayer;
