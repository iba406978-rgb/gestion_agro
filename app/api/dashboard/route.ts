import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const membres = await prisma.membre.count();

    const produits = await prisma.produit.count();

    const recoltes = await prisma.recolte.count();

    const ventes = await prisma.vente.count();


    return NextResponse.json({
      membres,
      produits,
      recoltes,
      ventes,
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur chargement dashboard"
      },
      {
        status:500
      }
    );

  }
}