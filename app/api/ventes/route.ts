import prisma from "@/lib/prisma";
import {NextRequest, NextResponse } from "next/server";


// Récupérer les ventes
export async function GET() {
  try {

    const ventes = await prisma.vente.findMany({
      include: {
        produit: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(ventes);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Erreur chargement ventes" },
      { status: 500 }
    );

  }
}


// Ajouter une vente
export async function POST(request: NextRequest) {

  try {

    const body = await request.json();


    const vente = await prisma.vente.create({

      data: {

        quantite: Number(body.quantite),

        prixUnitaire: Number(body.prixUnitaire),

        montantTotal:
          Number(body.quantite) * Number(body.prixUnitaire),

        produitId: Number(body.produitId),

      },

    });


    return NextResponse.json(vente, { status: 201 });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Erreur ajout vente" },
      { status: 500 }
    );

  }

}