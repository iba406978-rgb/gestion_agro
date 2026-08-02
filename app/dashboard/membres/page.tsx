"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Membre = {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
};

export default function MembresPage() {

  const [membres, setMembres] = useState<Membre[]>([]);


  const chargerMembres = async () => {

    const res = await fetch("/api/membres");

    const data = await res.json();

    setMembres(data);

  };


  useEffect(() => {

    chargerMembres();

  }, []);



  const supprimerMembre = async (id: number) => {

    const confirmation = confirm(
      "Voulez-vous vraiment supprimer ce membre ?"
    );


    if (!confirmation) return;


    await fetch(`/api/membres/${id}`, {
      method: "DELETE",
    });


    chargerMembres();

  };



  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Gestion des membres
        </h1>


        <Link
          href="/dashboard/membres/ajouter"
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Ajouter un membre
        </Link>

      </div>



      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Nom
              </th>

              <th className="p-3 text-left">
                Prénom
              </th>

              <th className="p-3 text-left">
                Téléphone
              </th>

              <th className="p-3 text-left">
                Adresse
              </th>

              <th className="p-3">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {membres.map((membre)=>(

              <tr key={membre.id} className="border-b">

                <td className="p-3">
                  {membre.nom}
                </td>

                <td className="p-3">
                  {membre.prenom}
                </td>

                <td className="p-3">
                  {membre.telephone}
                </td>

                <td className="p-3">
                  {membre.adresse}
                </td>


                <td className="p-3">

                  <Link
                    href={`/dashboard/membres/modifier/${membre.id}`}
                    className="text-blue-600 mr-4"
                  >
                    Modifier
                  </Link>


                  <button
                    onClick={() => supprimerMembre(membre.id)}
                    className="text-red-600"
                  >
                    Supprimer
                  </button>


                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}