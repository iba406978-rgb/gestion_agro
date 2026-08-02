"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecoltesPage() {
  const [recoltes, setRecoltes] = useState<any[]>([]);

  useEffect(() => {
    chargerRecoltes();
  }, []);

  async function chargerRecoltes() {
    try {
      const res = await fetch("/api/recoltes");

      if (!res.ok) {
        throw new Error("Erreur de chargement");
      }

      const data = await res.json();
      setRecoltes(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Liste des récoltes
        </h1>

        <Link
          href="/dashboard/recoltes/ajouter"
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          + Ajouter une récolte
        </Link>
      </div>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Produit</th>
            <th className="border p-3">Membre</th>
            <th className="border p-3">Quantité</th>
            <th className="border p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {recoltes.length > 0 ? (
            recoltes.map((recolte: any) => (
              <tr key={recolte.id}>
                <td className="border p-3">
                  {recolte.produit?.nom}
                </td>

                <td className="border p-3">
                  {recolte.membre?.nom} {recolte.membre?.prenom}
                </td>

                <td className="border p-3">
                  {recolte.quantite}
                </td>

                <td className="border p-3">
                  {new Date(recolte.dateRecolte).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-5">
                Aucune récolte enregistrée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}