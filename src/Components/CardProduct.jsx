import { Link } from "react-router-dom";

export default function CardProduct ({ data, bikeIds, addIds }) {
    return (
        <div className='card-product col-sm-12 col-md-8 col-lg-6 col-xl-5 bg-secondary rounded-3'>
            <h3 className='text-center text-light'>{data.title}</h3>
            <div className='d-flex justify-content-between mt-2 px-3 py-2'>
                <p className='my-auto bg-light py-1 px-3 rounded-3'><strong>{data.category}</strong></p>
                <div>
                    <Link className="btn btn-light p-1 mx-1 fs-6" to={`/detail-page/${data.id}`}>Vai al dettaglio</Link>
                    <button 
                        className={bikeIds.includes(data.id) ? "btn btn-danger p-1 mx-1 fs-6" : "btn btn-light p-1 mx-1 fs-6"}    
                        onClick={() => addIds(data.id)}
                    >
                        {bikeIds.includes(data.id) ? 'Rimuovi' : 'Confronta'}
                    </button>
                </div>
            </div>
        </div>
    );
};