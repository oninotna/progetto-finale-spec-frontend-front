import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function useBikes() {
  const [bikes, setBikes] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [bikeIds, setBikeIds] = useState([]);

  const [wishlistIds, setWishlistIds] = useState(() => {
    const saved = localStorage.getItem("wishlistIds");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    let url;

    url = apiUrl;

    if (query) {
      url += `?search=${query}`;
    }
    if (categoryFilter) {
      url += `${query ? '&' : '?'}category=${categoryFilter}`;
    }

    axios.get(`${url}`).then((res) => setBikes(res.data));
  }, [query, categoryFilter]);

  async function getBikeById(id) {
    const bike = await axios.get(`${apiUrl}/${id}`);

    return bike;
  }

  function addIds(id) {
    setBikeIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((bikeId) => bikeId !== id);
      }
      else {
        return [...prevIds, id];
      }
    });
  }

  async function getBikes(bikeIds) {
    try {
      if (
        bikeIds === null ||
        bikeIds === undefined ||
        !(bikeIds instanceof Array)
      ) {
        throw new TypeError("Parametro bikeIds non è un array");
      }

      const bikesPromise = bikeIds.map((id) => axios.get(`${apiUrl}/${id}`));

      const bikesResponse = await Promise.all(bikesPromise);

      const bikes = bikesResponse.map((res) => res.data.bikes);

      return bikes;
    } catch (err) {
      throw new Error("Errore col recupero dei dati: " + err.message);
    }
  }

  function addWishlistIds(id) {
    setWishlistIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((bikeId) => bikeId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }

  const hook = {
    bikes,
    getBikeById,
    query,
    setQuery,
    setCategoryFilter,
    bikeIds,
    setBikeIds,
    addIds,
    getBikes,
    wishlistIds,
    addWishlistIds,
  };

  return hook;
}
