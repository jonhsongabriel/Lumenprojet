import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: -18.8792,
  lng: 47.5079,
};

const API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "";

function Plan() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [position, setPosition] = useState(null);
  const [nom, setNom] = useState("");
  const [sites, setSites] = useState([]);
  const [searchBox, setSearchBox] = useState(null);
  const [loading, setLoading] = useState(false);

  // LOAD DATA
  const loadSites = async () => {
    try {
      const res = await axios.get(`${API}/sites`);
      setSites(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur sites:", err);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  // CLICK MAP
  const handleClick = (e) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  // SAVE LOCATION
  const saveLocation = async () => {
    if (!position || !nom.trim()) {
      alert("Nom + position requis");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/location`, {
        nom,
        latitude: position.lat,
        longitude: position.lng,
      });

      alert("Site enregistré !");
      setNom("");
      setPosition(null);
      loadSites();

    } catch (err) {
      console.error(err);
      alert("Erreur enregistrement");
    } finally {
      setLoading(false);
    }
  };

  // SEARCH
  const onLoadSearchBox = (ref) => setSearchBox(ref);

  const onPlacesChanged = () => {
    if (!searchBox) return;

    const places = searchBox.getPlaces();
    if (!places?.length) return;

    const loc = places[0]?.geometry?.location;
    if (!loc) return;

    setPosition({
      lat: loc.lat(),
      lng: loc.lng(),
    });
  };

  if (!isLoaded) {
    return <div className="text-center mt-5">Chargement carte...</div>;
  }

  return (
    <div className="container-fluid mt-3">

      <h3 className="mb-3">📍 Plan des sites solaires</h3>

      {/* INPUT */}
      <div className="row mb-2">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Nom du site"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
      </div>

      {/* SEARCH */}
      <div className="row mb-2">
        <div className="col-md-6">
          <StandaloneSearchBox
            onLoad={onLoadSearchBox}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              className="form-control"
              placeholder="Rechercher une adresse"
            />
          </StandaloneSearchBox>
        </div>
      </div>

      {/* MAP */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleClick}
      >
        {position && <Marker position={position} />}

        {sites.map((s, i) => (
          <Marker
            key={i}
            position={{
              lat: Number(s.latitude),
              lng: Number(s.longitude),
            }}
            title={s.nom}
          />
        ))}
      </GoogleMap>

      {/* ACTION PANEL */}
      {position && (
        <div className="card p-3 mt-3 shadow-sm">
          <p><b>Latitude:</b> {position.lat}</p>
          <p><b>Longitude:</b> {position.lng}</p>

          <button
            className="btn btn-success w-100"
            onClick={saveLocation}
            disabled={loading}
          >
            {loading ? "Enregistrement..." : "Valider emplacement"}
          </button>
        </div>
      )}

    </div>
  );
}

export default Plan;