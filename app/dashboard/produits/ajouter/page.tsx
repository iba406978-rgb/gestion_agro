"use client";



import { useState } from "react";

import { useRouter } from "next/navigation";





export default function AjouterProduitPage() {



  const router = useRouter();



  const [nom, setNom] = useState("");

  const [description, setDescription] = useState("");

  const [unite, setUnite] = useState("");





  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();





    const response = await fetch("/api/produits", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        nom,

        description,

        unite,

      }),

    });





    if (response.ok) {

      alert("Produit ajouté avec succès");

      router.push("/dashboard/produits");

    } else {

      alert("Erreur lors de l'ajout");

    }



  }





  return (

    <div>



      <h1 className="text-3xl font-bold mb-8">

        Ajouter un produit

      </h1>





      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl">





        <form 

          onSubmit={handleSubmit}

          className="space-y-5"

        >





          <div>

            <label className="block mb-2">

              Nom du produit

            </label>



            <input

              value={nom}

              onChange={(e)=>setNom(e.target.value)}

              type="text"

              placeholder="Ex: Poivron"

              className="w-full border rounded-lg p-3"

            />

          </div>





          <div>

            <label className="block mb-2">

              Description

            </label>



            <textarea

              value={description}

              onChange={(e)=>setDescription(e.target.value)}

              placeholder="Description du produit"

              className="w-full border rounded-lg p-3"

            />

          </div>





          <div>

            <label className="block mb-2">

              Unité

            </label>



            <input

              value={unite}

              onChange={(e)=>setUnite(e.target.value)}

              type="text"

              placeholder="Ex: kg"

              className="w-full border rounded-lg p-3"

            />

          </div>





          <button

            type="submit"

            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"

          >

            Enregistrer

          </button>





        </form>





      </div>





    </div>

  );

}