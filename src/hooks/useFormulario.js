import {useState} from "react"

export const useFormulario = (initialState = {}) => {
    const [inputs, setInputs] = useState(initialState)
  
    //Esta función nos ayuda a no escribir la logica dentro de cada campo de nuestro form
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target
        
        setInputs((old) => ({
            ...old, //Copiamos lo que venga de Old
            [name]: type === 'checkbox' ? checked : value,
        }))
    };

    const reset = () => {
        setInputs(initialState)
    }

    return [inputs, handleChange, reset]
}