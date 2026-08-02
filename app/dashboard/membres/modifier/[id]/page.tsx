"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ModifierMembrePage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;


  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");


  useEffect(() => {

    async function chargerMembre() {

      const res = await fetch(`/api/membres/${id}`);

      const data = await res.json();


      setNom(data.nom || "");
      setPrenom(data.prenom || "");
      setTelephone(data.telephone || "");
      setAdresse(data.adresse || "");

    }


    if(id){
      chargerMembre();
    }


  }, [id]);



  async function modifierMembre(e: React.FormEvent) {

    e.preventDefault();


    const res = await fetch(`/api/membres/${id}`, {

      method:"PUT",

      headers:{
        "Content-Type":"application/json",
      },


      body:JSON.stringify({

        nom,
        prenom,
        telephone,
        adresse,

      }),

    });



    if(res.ok){

      alert("Membre modifié avec succès");

      router.push("/dashboard/membres");

    }else{

      alert("Erreur modification");

    }

  }



  return (

    <div className="max-w-xl">

      <h1 className="text-3xl font-bold mb-6">
        Modifier un membre
      </h1>


      <form
        onSubmit={modifierMembre}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >


        <input
          className="w-full border p-3 rounded"
          value={nom}
          onChange={(e)=>setNom(e.target.value)}
          placeholder="Nom"
        />


        <input
          className="w-full border p-3 rounded"
          value={prenom}
          onChange={(e)=>setPrenom(e.target.value)}
          placeholder="Prénom"
        />


        <input
          className="w-full border p-3 rounded"
          value={telephone}
          onChange={(e)=>setTelephone(e.target.value)}
          placeholder="Téléphone"
        />


        <input
          className="w-full border p-3 rounded"
          value={adresse}
          onChange={(e)=>setAdresse(e.target.value)}
          placeholder="Adresse"
        />


        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-3 rounded"
        >
          Enregistrer
        </button>


      </form>


    </div>

  );

}