export default function CardComparisonData ({ data, addIds }) {

    return (
      <div className="card col-sm-12 col-md-5 col-lg-3 p-0">
        <div className="card-header my-comparison-card">
          <strong>{data.model}</strong>
          <button 
          className="btn btn-danger my-btn"
          onClick={() => addIds(data.id)}
          >
            ➖
          </button>
        </div>
        <div className="card-img">
          <img src={data.image} alt={data.title} style={{width: '100%'}}/>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Brand: </strong>{data.brand}</li>
          <li className="list-group-item"><strong>Categoria: </strong>{data.category}</li>
          <li className="list-group-item"><strong>Materiale telaio: </strong>{data.frame_material}</li>
          <li className="list-group-item"><strong>Materiale ruote: </strong>{data.wheels_material}</li>
          <li className="list-group-item"><strong>Cambio: </strong>{data.trasmission}</li>
          <li className="list-group-item"><strong>Freni: </strong>{data.brake}</li>
          <li className="list-group-item"><strong>Peso: </strong>{data.weigth}kg</li>
          <li className="list-group-item"><strong>Prezzo: </strong>€{data.price},00</li>
        </ul>
      </div>
    );
};