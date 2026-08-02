"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AjouterMembrePage() {

  const router = useRouter();


 const [form, setForm] = useState({
  nom: "",
  prenom: "",
  telephone: "",
  adresse: "",
});


  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();


    await fetch("/api/membres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });


    router.push("/dashboard/membres");

  }


  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Ajouter un membre
      </h1>


      <form onSubmit={handleSubmit} className="space-y-4">


        <input
          className="border p-2 w-full"
          placeholder="Nom"
          onChange={(e)=>setForm({...form, nom:e.target.value})}
        />


        <input
          className="border p-2 w-full"
          placeholder="Prénom"
          onChange={(e)=>setForm({...form, prenom:e.target.value})}
        />


        <input
          className="border p-2 w-full"
          placeholder="Téléphone"
          onChange={(e)=>setForm({...form, telephone:e.target.value})}
        />


        <input
          className="border p-2 w-full"
          placeholder="Adresse"
        />


        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>


      </form>


    </div>
  );
}