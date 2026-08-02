"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProduitsPage() {

  const [produits, setProduits] = useState<any[]>([]);

  useEffect(() => {
    chargerProduits();
  }, []);

  async function chargerProduits() {
    try {
      const res = await fetch("/api/produits");

      if (!res.ok) {
        throw new Error("Erreur chargement produits");
      }

      const data = await res.json();
      setProduits(data);

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-2xl font-bold">
          Liste des produits
        </h1>

        <Link
          href="/dashboard/produits/ajouter"
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          + Ajouter un produit
        </Link>

      </div>


      <table className="w-full border-collapse border">

        <thead>
          <tr className="bg-gray-100">

            <th className="border p-3">
              Nom
            </th>

            <th className="border p-3">
              Description
            </th>

            <th className="border p-3">
              Unité
            </th>

          </tr>
        </thead>


        <tbody>

          {produits.length > 0 ? (

            produits.map((produit) => (

              <tr key={produit.id}>

                <td className="border p-3">
                  {produit.nom}
                </td>

                <td className="border p-3">
                  {produit.description || "-"}
                </td>

                <td className="border p-3">
                  {produit.unite}
                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={3}
                className="text-center p-5"
              >
                Aucun produit enregistré
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}