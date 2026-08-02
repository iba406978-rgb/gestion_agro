import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// Récupérer un membre
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const membre = await prisma.membre.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(membre);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Erreur récupération" },
      { status: 500 }
    );
  }
}



// Modifier un membre
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const data = await request.json();


    const membre = await prisma.membre.update({

      where: {
        id: Number(id),
      },


      data: {

        nom: data.nom,

        prenom: data.prenom,

        telephone: data.telephone,

        adresse: data.adresse,

      },

    });


    return NextResponse.json(membre);


  } catch(error) {

    console.log(error);

    return NextResponse.json(
      { message:"Erreur modification" },
      { status:500 }
    );

  }

}



// Supprimer un membre
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;


    await prisma.membre.delete({

      where:{
        id:Number(id)
      }

    });


    return NextResponse.json({
      message:"Membre supprimé"
    });


  } catch(error) {

    console.log(error);

    return NextResponse.json(
      {message:"Erreur suppression"},
      {status:500}
    );

  }

}