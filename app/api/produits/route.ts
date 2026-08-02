import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET : récupérer tous les produits
export async function GET() {
  try {
    const produits = await prisma.produit.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(produits);

  } catch (error) {
    console.log("ERREUR GET PRODUITS :", error);

    return NextResponse.json(
      {
        message: "Erreur lors de la récupération des produits",
      },
      {
        status: 500,
      }
    );
  }
}


// POST : ajouter un produit
export async function POST(request: Request) {

  try {

    const body = await request.json();

    const { nom, description, unite } = body;


    const produit = await prisma.produit.create({
      data: {
        nom,
        description,
        unite,
      },
    });


    return NextResponse.json(
      produit,
      {
        status: 201,
      }
    );


  } catch (error) {

    console.log("ERREUR POST PRODUITS :", error);


    return NextResponse.json(
      {
        message: "Erreur lors de l'ajout du produit",
      },
      {
        status: 500,
      }
    );
  }
}