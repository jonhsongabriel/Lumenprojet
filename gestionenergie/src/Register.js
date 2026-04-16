import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    motdepasse: "",
    role: "client",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lumen/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors de l'inscription");
        return;
      }

      alert("Compte créé avec succès 🎉");
      window.location.href = "/login";
    } catch (error) {
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}>
        <h2 className="text-center text-success mb-2"><b>LUMEN</b></h2>
        <p className="text-center mb-4 fw-bold">Créer un compte</p>

        <form onSubmit={handleRegister}>

          <input
            className="form-control mb-3"
            placeholder="Nom complet"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Mot de passe"
            type="password"
            value={form.motdepasse}
            onChange={(e) => setForm({ ...form, motdepasse: e.target.value })}
            required
          />

          <select
            className="form-select mb-3"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="ingenieur">Ingénieur</option>
            <option value="technicien">Technicien</option>
            <option value="client">Client</option>
          </select>

          <button
            className="btn btn-dark w-100 py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Création..." : "Créer un compte"}
          </button>

        </form>

        <p className="text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>

      </div>
    </div>
  );
}

export default Register;