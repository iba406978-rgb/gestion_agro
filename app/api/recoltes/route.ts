import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recoltes = await prisma.recolte.findMany({
      include: {
        produit: true,
        membre: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(recoltes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des récoltes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const recolte = await prisma.recolte.create({
      data: {
        quantite: Number(body.quantite),
        dateRecolte: new Date(body.dateRecolte),
        membreId: Number(body.membreId),
        produitId: Number(body.produitId),
      },
    });

    return NextResponse.json(recolte);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement de la récolte" },
      { status: 500 }
    );
  }
}