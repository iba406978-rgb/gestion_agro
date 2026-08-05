export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {

  const membres = await prisma.membre.count();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Membres : {membres}</p>
    </div>
  );
}
import CardStat from "@/components/dashboard/CardStat";

import {
  Users,
  Package,
  Sprout,
  ShoppingCart,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import prisma from "@/lib/prisma";



export default async function DashboardPage() {


  const [
    membres,
    produits,
    recoltes,
    ventes
  ] = await Promise.all([

    prisma.membre.count(),

    prisma.produit.count(),

    prisma.recolte.count(),

    prisma.vente.count(),

  ]);



  // Dernières récoltes

  const dernieresRecoltes = await prisma.recolte.findMany({

    take: 3,

    orderBy: {
      id: "desc",
    },

    include: {
      produit: true,
    },

  });





  // Derniers produits ajoutés

  const derniersProduits = await prisma.produit.findMany({

    take: 3,

    orderBy: {
      id: "desc",
    },

  });





  // Prochaine récolte

  const prochaineRecolte = await prisma.recolte.findFirst({

    orderBy: {
      dateRecolte: "asc",
    },

    include:{
      produit:true
    }

  });





  return (

    <div className="space-y-8">



      {/* HEADER */}

      <div>

        <h1 className="
          text-3xl
          font-bold
          text-green-800
        ">

          Tableau de bord agricole

        </h1>


        <p className="
          text-gray-500
          mt-2
        ">

          Suivez facilement les activités de votre coopérative.

        </p>


      </div>





      {/* STATISTIQUES */}


      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">



        <CardStat
          title="Membres"
          value={membres}
          color="bg-green-600"
          icon={<Users size={30}/>}
        />



        <CardStat
          title="Produits"
          value={produits}
          color="bg-blue-500"
          icon={<Package size={30}/>}
        />



        <CardStat
          title="Récoltes"
          value={recoltes}
          color="bg-yellow-500"
          icon={<Sprout size={30}/>}
        />



        <CardStat
          title="Ventes"
          value={ventes}
          color="bg-red-500"
          icon={<ShoppingCart size={30}/>}
        />


      </div>







      {/* ACTIVITES + PLANNING */}


      <div className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
      ">





        {/* ACTIVITES RECENTES */}


        <div className="
          lg:col-span-2
          bg-white
          rounded-2xl
          border
          border-green-100
          p-6
          shadow-sm
        ">


          <div className="
            flex
            items-center
            gap-3
            mb-6
          ">


            <div className="
              bg-green-100
              p-3
              rounded-xl
              text-green-700
            ">

              <Sprout size={24}/>

            </div>



            <h2 className="
              text-xl
              font-bold
              text-gray-800
            ">

              Activités récentes

            </h2>


          </div>





          <div className="space-y-4">



            {
              dernieresRecoltes.length === 0 && (

                <p className="text-gray-500">

                  Aucune récolte enregistrée.

                </p>

              )
            }





            {
              dernieresRecoltes.map((recolte)=>(


                <div
                  key={recolte.id}
                  className="
                    flex
                    justify-between
                    bg-green-50
                    p-4
                    rounded-xl
                  "
                >


                  <span>

                    🌱 Récolte :

                    {" "}

                    {recolte.produit?.nom}

                  </span>



                  <span className="
                    text-green-700
                    font-semibold
                  ">

                    {recolte.quantite} kg

                  </span>



                </div>


              ))
            }







            {
              derniersProduits.map((produit)=>(


                <div
                  key={produit.id}
                  className="
                    flex
                    justify-between
                    bg-gray-50
                    p-4
                    rounded-xl
                  "
                >


                  <span>

                    📦 Produit :

                    {" "}

                    {produit.nom}

                  </span>



                  <span className="text-gray-500">

                    Nouveau

                  </span>


                </div>


              ))
            }



          </div>



        </div>









        {/* PLANNING */}


        <div className="
          bg-green-700
          rounded-2xl
          p-6
          text-white
        ">



          <div className="
            flex
            items-center
            gap-3
            mb-5
          ">


            <CalendarDays/>


            <h2 className="
              text-xl
              font-bold
            ">

              Planning

            </h2>


          </div>





          <p className="
            text-green-100
          ">

            Prochaine récolte

          </p>




          <h3 className="
            text-2xl
            font-bold
            mt-3
          ">


            {
              prochaineRecolte
              ?
              prochaineRecolte.produit?.nom
              :
              "Aucune prévue"
            }


          </h3>





          {
            prochaineRecolte && (

              <p className="
                text-green-100
                mt-3
              ">

                Date prévue :

                {" "}

                {
                  new Date(
                    prochaineRecolte.dateRecolte
                  ).toLocaleDateString("fr-FR")
                }

              </p>

            )
          }






          <button
            className="
              mt-6
              bg-white
              text-green-700
              px-5
              py-3
              rounded-xl
              font-semibold
              hover:bg-green-50
              transition
            "
          >

            Voir détails

          </button>



        </div>





      </div>









      {/* PERFORMANCE */}



      <div className="
        bg-white
        rounded-2xl
        border
        border-green-100
        p-6
        shadow-sm
      ">



        <div className="
          flex
          items-center
          gap-3
          mb-5
        ">


          <TrendingUp
            className="text-green-700"
          />


          <h2 className="
            text-xl
            font-bold
          ">

            Performance agricole

          </h2>


        </div>





        <div className="
          grid
          md:grid-cols-3
          gap-5
        ">



          <div className="
            bg-green-50
            rounded-xl
            p-5
          ">

            <p className="text-gray-500">

              Production

            </p>

            <h3 className="
              text-2xl
              font-bold
              text-green-700
            ">

              +25%

            </h3>


          </div>





          <div className="
            bg-green-50
            rounded-xl
            p-5
          ">


            <p className="text-gray-500">

              Ventes

            </p>


            <h3 className="
              text-2xl
              font-bold
              text-green-700
            ">

              +18%

            </h3>


          </div>






          <div className="
            bg-green-50
            rounded-xl
            p-5
          ">


            <p className="text-gray-500">

              Membres actifs

            </p>


            <h3 className="
              text-2xl
              font-bold
              text-green-700
            ">

              85%

            </h3>


          </div>




        </div>



      </div>




    </div>

  );

}