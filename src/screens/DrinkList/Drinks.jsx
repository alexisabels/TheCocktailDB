
import { Link } from 'react-router-dom';

function Drinks() {
  return (
    <div>
      <h2>Bebidas</h2>
      <ul>
        <li>
          <Link to="/drinks/1">Cerveza</Link>
        </li>
        <li>
          <Link to="/drinks/2">Vino</Link>
        </li>
        <li>
          <Link to="/drinks/3">Refresco</Link>
        </li>
      </ul>
    </div>
  );
}

export default Drinks;
