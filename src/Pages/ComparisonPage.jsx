import { useEffect, useState, useRef } from "react";
import { useBikesContext } from "../Contexts/BikesContext";
import CardComparisonData from "../Components/CardComparisonData";
import { useNavigate } from "react-router-dom";



export default function ComparisonPage () {
    const { bikeIds, setBikeIds, getBikes, addIds } = useBikesContext();
    const [dataBikes, setDataBikes] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
    const topRef = useRef();

    useEffect(() => {
        if(topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });

        if (bikeIds.length < 2) {
            navigate('/');
        };
        
        function dataRecovery () {
            getBikes(bikeIds)
            .then(res => {
                setDataBikes(res);
            })
            .catch(err => console.error(err)); 
        };
        
        dataRecovery()
    }, [bikeIds]);

    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    if (!dataBikes.length) return (
        <div>
            <h1 
                className='rounded-3 p-4 text-center' 
                style={{backgroundColor: 'red', 
                color: 'white'}}
                >
                Nessun dato disponibile
            </h1>
        </div>
    )

    return(
        <div ref={topRef} className="container p-3">
            <h1 className="mt-3 text-center text-secondary">Pagina di confronto</h1>
            <div className="row justify-content-center gap-4" style={{marginTop: '20px'}} >
                {
                dataBikes.length > 0 && isMobile ?
                <div className="table-responsive" style={{ overflowX: "auto", scrollBehavior: "smooth" }}>
                    <table className="table table-bordered align-middle text-center">
                        <thead className="table-secondary">
                          <tr>
                            <th>Caratteristica</th>
                            {dataBikes.map((bike) => (
                              <th key={bike.id}>{bike.model}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Brand", "brand"],
                            ["Categoria", "category"],
                            ["Materiale telaio", "frame_material"],
                            ["Materiale ruote", "wheels_material"],
                            ["Cambio", "trasmission"],
                            ["Freni", "brake"],
                            ["Peso", "weigth"],
                            ["Prezzo", "price"]
                          ].map(([label, bikeProperty]) => (
                            <tr key={bikeProperty}>
                              <td>{label}</td>
                              {dataBikes.map((bikeItem) => (
                                <td key={bikeItem.id}>
                                  {bikeProperty === "price" ? `€${bikeItem[bikeProperty]},00` : bikeItem[bikeProperty]}
                                </td>
                              ))}
                            </tr>
                          ))}
                          <tr>
                            <td>Rimuovi</td>
                            {dataBikes.map((bikeItem) => (
                              <td key={bikeItem.id}>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => addIds(bikeItem.id)}
                                >
                                  ➖
                                </button>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                        </table>
                </div>
                :
                dataBikes.map(bike => <CardComparisonData data={bike} addIds={addIds} key={bike.id} />)
                }
            </div>
        </div>
    );
};