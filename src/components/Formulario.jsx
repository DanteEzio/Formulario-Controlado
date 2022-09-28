import React from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useFormulario } from "../hooks/useFormulario";

const Formulario = ({agregarTodo}) => {

    //Esta Objeto nos ayuda a indicar el valor inicial de nuestro Objeto
    const initialState = {
        nombre: "Dante",
        descripcion: "Como estas?",
        estado: "",
        prioridad1: false,
        prioridad2: false,
    }

    const [inputs, handleChange, reset] = useFormulario(initialState);

    //Destructuramos nuestro objeto para poder usar el apartado de value de manera mas sencillas
    const { nombre, descripcion, estado, prioridad1, prioridad2 } = inputs
    
    //Esta función es la que se encarga de activar nuestro formulario
    const handleSubmit = e => {
        e.preventDefault()
      
      if (!nombre.trim()) {
        e.target[0].focus() //En caso de que el campo se encuentre en blanco nos pinta el campo donde tenemos que escribir
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error!",
          text: "No deje el nombre en blanco",
          timer: 1500,
        });
        return
      }

      if (!descripcion.trim()) {
        e.target[1].focus(); //En caso de que el campo se encuentre en blanco nos pinta el campo donde tenemos que escribir
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error!",
          text: "No deje la descripcion en blaco",
          timer: 1500,
        });
        return;
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Exito!",
        text: "Formulario Enviado",
        timer: 1500,
      });

      agregarTodo({
        nombre,
        descripcion,
        estado: estado === "pendiente" ? false : true,
        prioridad1: prioridad1,
        prioridad2: prioridad2,
        id: uuidv4(), //Nos ayuda a ingresar un id Aleatorio
      });
      // console.log(todo)
      reset()
    }

  return (
    <>
      <h2>Agregar TODO</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="nombre"
          placeholder="Ingrese todo nombre"
          value={nombre}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="descripcion"
          id=""
          cols="30"
          rows="10"
          value={descripcion}
          onChange={handleChange}
        />
        <select
          className="form-control mb-2"
          name="estado"
          value={estado}
          id=""
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={prioridad1}
            name="prioridad1"
            id="flexCheckDefault"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Prioritario
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={prioridad2}
            name="prioridad2"
            id="flexCheckChecked"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            No Prioritario
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
    </>
  );
};

export default Formulario;
