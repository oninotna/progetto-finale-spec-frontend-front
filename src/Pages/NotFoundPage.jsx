import { Link } from "react-router-dom";
export default function NotFoundPage () { 
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
        <h1 className="display-3 fw-bold p-3 mb-3 bg-danger rounded-3">ERR 404</h1>
        <h2 className="mb-4 bg-light rounded-3 p-3">La pagina cercata non è stata trovata</h2>
        <div className="col-md-4">
          <Link to="/" className="btn btn-light btn-lg w-100">
            Ritorna alla Home 🏠
          </Link>
        </div>
      </div>
    );
}