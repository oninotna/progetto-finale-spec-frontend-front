import { Link } from "react-router-dom";

export default function CardProduct({ data, bikeIds, addIds }) {
  
  return (
    <div className="col-12 col-md-6 col-xl-4 p-3">
      <div className="card-product rounded-3 bg-secondary h-100 py-2">
        <h3 className="text-center text-light">{data.title}</h3>
        <div className="d-flex justify-content-between px-3 py-2">
          <p className="my-auto border border-light border-2 text-light py-1 px-3 rounded-pill">
            <strong>{data.category}</strong>
          </p>
          <div>
            <Link
              className="btn btn-light p-1 mx-1 fs-6"
              to={`/detail-page/${data.id}`}
            >
              Vai al dettaglio
            </Link>
            <button
              className={
                bikeIds.includes(data.id)
                  ? "btn btn-danger p-1 mx-1 fs-6"
                  : "btn btn-light p-1 mx-1 fs-6"
              }
              onClick={() => addIds(data.id)}
            >
              {bikeIds.includes(data.id) ? "Rimuovi" : "Confronta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
