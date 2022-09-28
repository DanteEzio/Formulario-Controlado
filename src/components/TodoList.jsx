import React, { useState } from "react";
import { useEffect } from "react";
import Formulario from "./Formulario";
import Todo from "./Todo";

const TodoList = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      setTodos(JSON.parse(localStorage.getItem('todos')))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const agregarTodo = todo => {
    console.log(todo);
    setTodos((old) => [...old, todo])
  }

  const editarTodo = (id) => {
    const editarTodos = todos.map(item => (
      item.id === id ? {...item, estado: !item.estado} : item
    ))

    setTodos(editarTodos)
  }

  const eliminarTodo = (id) => {
    //Esta funcion nos permite eliminar la tarea que estamos seleccionando
    setTodos((old) => old.filter(item => item.id !== id))
  }

  return (
    <>
      <Formulario agregarTodo={agregarTodo} />
      <ol className="list-group list-group-numbered mt-2">
        {todos.map((item) => (
          <Todo key={item.id} todo={item} eliminarTodo={eliminarTodo}
            editarTodo={ editarTodo } />
        ))}
      </ol>
    </>
  );
};

export default TodoList;
