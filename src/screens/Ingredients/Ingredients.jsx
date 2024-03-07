
import { useParams } from 'react-router-dom';

function Ingredients() {
  let { id } = useParams();

  return (
    <div>
      <h2>Detalles de la Bebida</h2>
      <p>ID de la bebida: {id}</p>
      {/* Aquí podrías mostrar detalles específicos de la bebida */}
    </div>
  );
}

export default Ingredients;
