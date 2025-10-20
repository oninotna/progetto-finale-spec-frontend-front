import { useBikesContext } from "../Contexts/BikesContext";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function DetailPage () {
    const { getBikeById, addIds, bikeIds, wishlistIds, addWishlistIds } = useBikesContext();
    const { id } = useParams();
    const [bike, setBike] = useState({});
    const [error, setError] = useState('');
    const topRef = useRef();
    
    useEffect(() => {
        topRef.current.scrollIntoView({ behavior: "smooth" });
        getBikeById(id)
        .then(res => {
            if (res.data.success === false) {
              const message = res.data.message || 'Errore nel recupero dei dati';
              throw new Error(message);
            };

            setBike(res.data.bikes);
        })
        .catch(err => {
            console.error(err.message || err)
            setError(err.message || err);
        });
    }, [])

    return(
        <div ref={topRef} className='container p-3 h-100' style={{marginTop:'50px'}}>
            {error ? 
            <div className='d-flex justify-content-center align-items-center h-100'>
                <h1 
                    className='rounded-3 p-4' 
                    style={{backgroundColor: 'red', 
                    color: 'white'}}
                    >
                    {error}
                </h1>
            </div>
            :
            <div>
                <div className='row justify-content-center gap-5'>
                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 bg-light rounded-3 border border-4 border-secondary d-flex justify-content-center align-items-center">
                    <img className='img-fluid' src={bike.image} alt={bike.title} />
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-12 col-sm-12 bg-secondary text-light rounded-3 py-2'>
                        <div className="bg-light text-secondary rounded-3 p-2">
                            <h4>{bike.title}</h4>
                            <h5>Prezzo: €{bike.price},00 </h5> 
                        </div>
                        <div className="row">
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Brand: </strong>{bike.brand}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Model: </strong>{bike.model}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Cambio: </strong>{bike.trasmission}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Freni: </strong>{bike.brake}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Taglie disponibili: </strong>{[bike.available_sizes].join('')}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Materiale del telaio: </strong>{bike.frame_material}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Materiale delle ruote: </strong>{bike.wheels_material}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Sospensioni: </strong>{bike.suspensions}</p>
                            <p className="col-xl-12 col-lg-8 col-md-6 col-sm-4"><strong>Peso: </strong>{bike.weigth}kg</p> 
                        </div>
                        
                        <button 
                            className={bikeIds.includes(bike.id) ? "btn btn-success" : "btn btn-light"}
                            onClick={() => addIds(bike.id)}
                        >
                            {bikeIds.includes(bike.id) ? 'Aggiunta al confronto' : 'Aggiungi al confronto'}
                        </button>
                        <button className="btn ms-4"
                        onClick={() => addWishlistIds(bike.id)}
                        >
                            {wishlistIds.includes(bike.id) ? '❤' : '🖤'}
                        </button>
                    </div>
                </div>
                <p className='my-5 fs-5 text-secondary rounded-3 p-2'><strong className="fs-4">Descrizione: </strong><br />{bike.description}</p>
            </div>
            }
        </div>
    );
};