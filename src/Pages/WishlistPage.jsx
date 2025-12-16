import { useEffect, useState, useRef } from "react";
import { useBikesContext } from "../Contexts/BikesContext";
import CardComparisonData from "../Components/CardComparisonData";

export default function () {
    const { wishlistIds, getBikes, addWishlistIds } = useBikesContext();
    const [dataBikes, setDataBikes] = useState([]);
    const topRef = useRef();

    useEffect(() => {
      topRef.current.scrollIntoView({ behavior: "smooth" });

        function dataRecovery () {
            getBikes(wishlistIds)
            .then(res => {
                setDataBikes(res);
            })
            .catch(err => console.error(err)); 
        };
        
        dataRecovery()
    }, [wishlistIds]);

    return (
      <div ref={topRef} className="container p-3">
          <h1 className="mt-3 text-center text-secondary">Lista dei desideri</h1>
        <div className="row justify-content-center gap-4" style={{marginTop: '20px'}} >
          {dataBikes.length > 0 ? (
            dataBikes.map((bike) => (
              <CardComparisonData data={bike} addIds={addWishlistIds} key={bike.id} />
            ))
          ) : (
            <div>
              <h1
                className="rounded-3 p-4 text-center"
                style={{ backgroundColor: "red", color: "white"}}
              >
                La tua lista dei desideri è vuota
              </h1>
            </div>
          )}
        </div>
      </div>
    );
};