import { useBikesContext } from '../Contexts/BikesContext';
import CardProduct from '../Components/CardProduct';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

function debounce (callback, deelay) {
  let timer = 0
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, deelay);
  };
};

export default function HomePage () {
    const { bikes, query, setQuery, setCategoryFilter, bikeIds, addIds } = useBikesContext();
    const [orderData, setOrderData] = useState('');
    const topRef = useRef();
    const [filterSection, setFilterSection] = useState(false)

    const bikesData = useMemo(() => {
        let filteredBikes;

        if(orderData === ''){
        filteredBikes = [...bikes];
        }
        else if(orderData === 'titA-Z'){
            filteredBikes = [...bikes].sort((a,b) => a.title.localeCompare(b.title));
        }else if(orderData === 'titZ-A'){
            filteredBikes = [...bikes].sort((a,b) => b.title.localeCompare(a.title));
        }else if(orderData === 'catA-Z'){
            bikefilteredBikessData = [...bikes].sort((a,b) => a.category.localeCompare(b.category));
        }
        else if(orderData === 'catZ-A'){
            filteredBikes = [...bikes].sort((a,b) => b.category.localeCompare(a.category));
        };

        return filteredBikes;
    }, [bikes, orderData]);

    const debouncedSetQuery = useCallback(debounce(setQuery, 750), []);

    useEffect(() => {
        topRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div ref={topRef}>
        <div className='hero' style={{marginTop: '20px'}}>
            <div className='hero-opacity d-flex flex-column justify-content-center align-items-center'>
                <div>
                    <h2 className='text-center fs-1 rounded-3 text-light'>Benvenuto su BoolBikes</h2>
                    <p className='text-center fs-5 rounded-3 p-2 text-light'>
                    Scopri la nostra selezione di biciclette
                    </p> 
                </div>
            </div>  
        </div>
        <div className='container px-3'>
            <div className=' px-4 py-1'>
                <button className='btn btn-secondary mt-3' 
                    onClick={() => setFilterSection(!filterSection)}
                >
                    {filterSection ? 'Nascondi filtri' : 'Mostra filtri'}
                </button>
                    <div
                        className="row justify-content-center gap-3 my-3 overflow-hidden transition-all"
                        style={{
                            maxHeight: filterSection ? "500px" : "0",
                            opacity: filterSection ? 1 : 0,
                            transition: `
                              max-height 0.5s ease-in-out,
                              opacity 0.4s ease-in-out ${filterSection ? "0.1s" : "0s"}
                            `,
                        }}
                    >
                        <div className='col-lg-12 col-xl-3 p-2 bg-secondary rounded-3'>
                            <p className='fs-5 m-0 text-light'>Cerca</p>
                            <input 
                                className='fs-5 form-control '
                                type="text"
                                // value={query}
                                onChange={(e) => debouncedSetQuery(e.target.value)} />
                        </div>
                        <div className='col-lg-12 col-xl-3 p-2 bg-secondary rounded-3 text-light'>
                            <p className='fs-5 m-0'>Filtra per categoria:</p>
                            <select className='fs-5 form-select'
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value=''>Tutte le categorie</option>
                                <option value='mtb'>Mountain bike</option>
                                <option value='bdc'>Bici da corsa</option>
                                <option value='e-mtb'>Mountain bike elettriche</option>
                            </select>
                        </div>
                        <div className='col-lg-12 col-xl-3 p-2 bg-secondary rounded-3'>
                            <p className='fs-5 m-0 text-light'>Ordina per:</p>
                            <select className='fs-5 form-select'
                                onChange={(e) => setOrderData(e.target.value)}
                            >
                                <option value=''>Seleziona</option>
                                <option value='titA-Z'>Titolo A-Z</option>
                                <option value='titZ-A'>Titolo Z-A</option>
                                <option value='catA-Z'>Categoria A-Z</option>
                                <option value='catZ-A'>Categoria Z-A</option>
                            </select>
                        </div>
                    </div>
                <h1 className='text-center mt-2 rounded-3 text-secondary'>🚴🏻‍♂️ Le nostre bici 🚴🏻‍♂️</h1>

            </div>
            <div className='row my-3 gap-3 justify-content-center'>
                {
                bikesData.length ? 
                bikesData.map(bike => <CardProduct data={bike} bikeIds={bikeIds} addIds={addIds} key={bike.id} />) 
                :
                <div>
                    <h1 
                        className='rounded-3 p-4 text-center' 
                        style={{backgroundColor: 'red', 
                        color: 'white'}}
                        >
                        Nessun dato disponibile
                    </h1>
                </div>
                }
            </div>
        </div>
        </div>
    );
};