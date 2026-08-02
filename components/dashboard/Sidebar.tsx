"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Package,
  Sprout,
  ShoppingCart,
  Leaf,
  LogOut,
} from "lucide-react";


export default function Sidebar() {

  const pathname = usePathname();


  const menus = [
    {
      name: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Membres",
      href: "/dashboard/membres",
      icon: Users,
    },
    {
      name: "Produits",
      href: "/dashboard/produits",
      icon: Package,
    },
    {
      name: "Récoltes",
      href: "/dashboard/recoltes",
      icon: Sprout,
    },
    {
      name: "Ventes",
      href: "/dashboard/ventes",
      icon: ShoppingCart,
    },
  ];



  return (

    <aside
      className="
        w-72
        min-h-screen
        bg-gradient-to-b
        from-green-500
        via-emerald-500
        to-green-600
        text-white
        p-6
        shadow-xl
        flex
        flex-col
      "
    >


      {/* Logo */}

      <div className="
        flex
        items-center
        gap-3
        mb-12
      ">


        <div
          className="
            bg-white
            rounded-2xl
            p-3
            shadow-lg
          "
        >

          <Leaf
            size={32}
            className="text-green-600"
          />

        </div>



        <div>

          <h1 className="
            text-2xl
            font-bold
          ">
            AgroGestion
          </h1>


          <p className="
            text-sm
            text-green-100
          ">
            Solution agricole
          </p>


        </div>


      </div>





      {/* Menu */}

      <nav className="
        space-y-3
        flex-1
      ">


        {menus.map((menu)=>{


          const Icon = menu.icon;


          const active =
            pathname === menu.href ||
            pathname.startsWith(menu.href + "/");



          return (

            <Link
              key={menu.href}
              href={menu.href}

              className={`
                flex
                items-center
                gap-4
                px-5
                py-3.5
                rounded-2xl
                transition-all
                duration-300

                ${
                  active
                  ?
                  "bg-white text-green-600 shadow-lg"
                  :
                  "text-white hover:bg-white/20 hover:translate-x-1"
                }

              `}
            >


              <Icon size={23}/>


              <span className="
                font-semibold
              ">
                {menu.name}
              </span>


            </Link>

          );


        })}


      </nav>





      {/* Information */}

      <div
        className="
          bg-white/20
          backdrop-blur
          rounded-2xl
          p-4
          mb-4
        "
      >

        <p className="
          font-semibold
        ">
          🌱 Agriculture intelligente
        </p>


        <p className="
          text-xs
          text-green-50
          mt-1
        ">
          Gestion complète de votre exploitation
        </p>


      </div>





      {/* Déconnexion */}

      <button
        className="
          flex
          items-center
          gap-3
          px-5
          py-3
          rounded-2xl
          bg-white/10
          hover:bg-red-500/30
          transition
        "
      >

        <LogOut size={21}/>

        <span>
          Déconnexion
        </span>


      </button>



    </aside>

  );

}