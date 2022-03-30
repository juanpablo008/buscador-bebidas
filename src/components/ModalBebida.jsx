import { Modal, Image } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const ModalBebida = () => {

  const { modal, handleModalClick, receta, cargando } = useBebidas()

  const mostrarInredientes = () => {
    let ingredientes = []
    for(let i = 1; i <= 15; i++) {
      if(receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {receta[`strIngredient${i}`]}
            {receta[`strMeasure${i}`] ? ` (${receta[`strMeasure${i}`]})` : null}
          </li>
        )
      }
    }
    return (
      <ul>
        {ingredientes}
      </ul>
    )
  }

  return (

    !cargando && (
      <Modal show={modal} onHide={handleModalClick}>
        <Image src={receta.strDrinkThumb} alt={`Imagen receta ${receta.strDrink}`} fluid />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instructions</h2>
            {receta.strInstructions}
            <h2 className='mt-3'>Ingredients & Amounts</h2>
            {mostrarInredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}

export default ModalBebida