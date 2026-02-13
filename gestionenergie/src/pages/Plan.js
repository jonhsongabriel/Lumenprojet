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
  height: "500px",
};

const center = {
  lat: -18.8792,
  lng: 47.5079,
};

function Plan() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "TA_CLE_API",
    libraries: ["places"],
  });

  const [position, setPosition] = useState(null);
  const [nom, setNom] = useState("");
  const [sites, setSites] = useState([]);
  const [searchBox, setSearchBox] = useState(null);

  const loadSites = async () => {
    try {
      const res = await axios.get("http://localhost:8000/sites");
      setSites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleClick = (e) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const saveLocation = async () => {
    if (!position || !nom) {
      alert("Veuillez sélectionner un endroit et un nom");
      return;
    }

    try {
      await axios.post("http://localhost:8000/location", {
        nom,
        latitude: position.lat,
        longitude: position.lng,
      });

      alert("Coordonnées enregistrées !");
      setNom("");
      setPosition(null);
      loadSites();
    } catch (err) {
      console.error(err);
    }
  };

  const onLoadSearchBox = (ref) => setSearchBox(ref);

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0].geometry.location;
    setPosition({
      lat: place.lat(),
      lng: place.lng(),
    });
  };

  if (!isLoaded) return <div>Chargement carte...</div>;

  return (
    <div className="container mt-3">
      <h4>📍 Plan – Localisation du site solaire</h4>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Nom du site solaire"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <StandaloneSearchBox
        onLoad={onLoadSearchBox}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Chercher une adresse"
          className="form-control mb-2"
        />
      </StandaloneSearchBox>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleClick}
      >
        {position && <Marker position={position} />}

        {sites.map((site, index) => (
          <Marker
            key={index}
            position={{
              lat: Number(site.latitude),
              lng: Number(site.longitude),
            }}
            title={site.nom}
          />
        ))}
      </GoogleMap>

      {position && (
        <div className="mt-3">
          <p><strong>Latitude :</strong> {position.lat}</p>
          <p><strong>Longitude :</strong> {position.lng}</p>
          <button className="btn btn-success" onClick={saveLocation}>
            ✅ Valider l’emplacement
          </button>
        </div>
      )}
    </div>
  );
}

export default Plan;
