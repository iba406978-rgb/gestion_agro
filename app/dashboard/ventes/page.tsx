"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VentesPage() {

  const [ventes, setVentes] = useState<any[]>([]);

  useEffect(() => {
    chargerVentes();
  }, []);


  async function chargerVentes() {

    try {

      const res = await fetch("/api/ventes");

      const data = await res.json();

      setVentes(data);

    } catch (error) {

      console.error(error);

    }

  }


  return (

    <div className="p-6">


      <div className="flex justify-between items-center mb-5">

        <h1 className="text-2xl font-bold">
          Liste des ventes
        </h1>


        <Link
          href="/dashboard/ventes/ajouter"
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          + Ajouter une vente
        </Link>


      </div>



      <table className="w-full border-collapse border">


        <thead>

          <tr className="bg-gray-100">

            <th className="border p-3">
              Produit
            </th>

            <th className="border p-3">
              Quantité
            </th>

            <th className="border p-3">
              Prix unitaire
            </th>

            <th className="border p-3">
              Montant total
            </th>

            <th className="border p-3">
              Date
            </th>

          </tr>

        </thead>


        <tbody>


          {ventes.length > 0 ? (

            ventes.map((vente) => (

              <tr key={vente.id}>


                <td className="border p-3">
                  {vente.produit?.nom}
                </td>


                <td className="border p-3">
                  {vente.quantite}
                </td>


                <td className="border p-3">
                  {vente.prixUnitaire} FCFA
                </td>


                <td className="border p-3">
                  {vente.montantTotal} FCFA
                </td>


                <td className="border p-3">
                  {new Date(vente.dateVente).toLocaleDateString()}
                </td>


              </tr>

            ))

          ) : (

            <tr>

              <td colSpan={5} className="text-center p-5">
                Aucune vente enregistrée
              </td>

            </tr>

          )}


        </tbody>


      </table>


    </div>

  );

}