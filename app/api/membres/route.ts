import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// =======================
// AFFICHER TOUS LES MEMBRES
// =======================
export async function GET() {
  try {
    const membres = await prisma.membre.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(membres);

  } catch (error) {
    console.log("ERREUR GET MEMBRES :", error);

    return NextResponse.json(
      {
        message: "Erreur serveur",
      },
      {
        status: 500,
      }
    );
  }
}


// =======================
// AJOUTER UN MEMBRE
// =======================
export async function POST(request: Request) {

  try {

    const data = await request.json();


   const membre = await prisma.membre.create({
  data: {
    nom: data.nom,
    prenom: data.prenom,
    telephone: data.telephone,
    adresse: data.adresse,
      },
    });


    return NextResponse.json(
      membre,
      {
        status: 201,
      }
    );
  

  } catch (error) {

    console.log("ERREUR POST MEMBRE :", error);


    return NextResponse.json(
      {
        message: "Erreur serveur",
      },
      {
        status: 500,
      }
    );

  }
}