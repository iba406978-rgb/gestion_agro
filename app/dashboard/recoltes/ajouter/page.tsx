"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterRecoltePage() {
  const router = useRouter();

  const [produits, setProduits] = useState<any[]>([]);
  const [membres, setMembres] = useState<any[]>([]);

  const [produitId, setProduitId] = useState("");
  const [membreId, setMembreId] = useState("");
  const [quantite, setQuantite] = useState("");
  const [dateRecolte, setDateRecolte] = useState("");

  useEffect(() => {
    chargerProduits();
    chargerMembres();
  }, []);

  async function chargerProduits() {
    try {
      const res = await fetch("/api/produits");
      const data = await res.json();
      setProduits(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function chargerMembres() {
    try {
      const res = await fetch("/api/membres");
      const data = await res.json();
      setMembres(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function enregistrerRecolte(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/recoltes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produitId: Number(produitId),
          membreId: Number(membreId),
          quantite: Number(quantite),
          dateRecolte,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur");
      }

      alert("Récolte enregistrée avec succès");
      router.push("/dashboard/recoltes");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Ajouter une récolte
      </h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-xl">
        <form onSubmit={enregistrerRecolte} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Produit
            </label>

            <select
              value={produitId}
              onChange={(e) => setProduitId(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Sélectionner un produit
              </option>

              {produits.map((produit) => (
                <option key={produit.id} value={produit.id}>
                  {produit.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Membre
            </label>

            <select
              value={membreId}
              onChange={(e) => setMembreId(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Sélectionner un membre
              </option>

              {membres.map((membre) => (
                <option key={membre.id} value={membre.id}>
                  {membre.nom} {membre.prenom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Quantité
            </label>

            <input
              type="number"
              step="0.01"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Date de récolte
            </label>

            <input
              type="date"
              value={dateRecolte}
              onChange={(e) => setDateRecolte(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Enregistrer
          </button>

        </form>
      </div>
    </div>
  );
}