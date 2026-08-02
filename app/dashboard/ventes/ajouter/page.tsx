"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AjouterVentePage(){

const router = useRouter();


const [produits,setProduits] = useState<any[]>([]);

const [produitId,setProduitId] = useState("");

const [quantite,setQuantite] = useState("");

const [prixUnitaire,setPrixUnitaire] = useState("");



useEffect(()=>{

chargerProduits();

},[]);



async function chargerProduits(){

const res = await fetch("/api/produits");

const data = await res.json();

setProduits(data);

}



async function enregistrerVente(e:React.FormEvent){

e.preventDefault();



const res = await fetch("/api/ventes",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

produitId,

quantite,

prixUnitaire

})

});



if(res.ok){

alert("Vente enregistrée avec succès");

router.push("/dashboard/ventes");

}



}



return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Ajouter une vente
</h1>


<div className="bg-white shadow rounded-xl p-6 max-w-xl">


<form onSubmit={enregistrerVente} className="space-y-5">



<div>

<label className="block mb-2">
Produit
</label>


<select

className="w-full border rounded-lg p-3"

value={produitId}

onChange={(e)=>setProduitId(e.target.value)}

required

>

<option value="">
Choisir un produit
</option>


{produits.map((produit)=>(

<option key={produit.id} value={produit.id}>

{produit.nom}

</option>

))}


</select>

</div>



<div>

<label className="block mb-2">
Quantité
</label>


<input

type="number"

className="w-full border rounded-lg p-3"

value={quantite}

onChange={(e)=>setQuantite(e.target.value)}

required

/>

</div>



<div>

<label className="block mb-2">
Prix unitaire
</label>


<input

type="number"

className="w-full border rounded-lg p-3"

value={prixUnitaire}

onChange={(e)=>setPrixUnitaire(e.target.value)}

required

/>

</div>



<button

className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"

>

Enregistrer

</button>



</form>


</div>


</div>

)


}