import { useState, useEffect, createContext } from "react"
import Swal from 'sweetalert2'
import axios from "axios"

const BebidasContext = createContext()

const BebidasProvider = ({ children }) => {

  const [bebidas, setBebidas] = useState([])
  const [modal, setModal] = useState(false)
  const [bebidaId, setBebidaId] = useState(null)
  const [receta, setReceta] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setCargando(true)
    const obtenerReceta = async () => {
      if(!bebidaId) return

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`


        const { data } = await axios.get(url)
        setReceta(data.drinks[0])
      } catch (error) {
        newSwalAlert('Error','Hubo un error al consultar la receta', 'error', false, 2000)
      } finally {
        setCargando(false)
      }
    }

    obtenerReceta()
  }, [bebidaId])
  

  const consultarBebida = async datos => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

      const { data } = await axios.get(url)
      newSwalAlert("Success", "Busqueda hecha con exito.", "success", false, 1000)
      setBebidas(data.drinks)
    } catch (error) {
      newSwalAlert('Error','Hubo un error al hacer la consulta', 'error', false, 2000)
    }
  }

  const newSwalAlert = (title, text, icon, showConfirmButton, timer) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton,
      timer
    })
  }

  const handleModalClick = () => {
    setModal(!modal)
  }

  const handleBebidaIdClick = id => {
    setBebidaId(id)
  }

  return (
    <BebidasContext.Provider 
      value={{
        consultarBebida,
        bebidas,
        newSwalAlert,
        modal,
        handleModalClick,
        handleBebidaIdClick,
        receta,
        cargando
      }}
    >
      {children}
    </BebidasContext.Provider>
  )
}

export {
  BebidasProvider
}

export default BebidasContext