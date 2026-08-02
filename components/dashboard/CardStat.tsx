import { ReactNode } from "react";


type CardStatProps = {

  title: string;

  value: number;

  color: string;

  icon: ReactNode;

};



export default function CardStat({

  title,

  value,

  color,

  icon,

}: CardStatProps) {


  return (

    <div
      className="
      bg-white
      rounded-2xl
      p-6
      shadow-sm
      border
      border-gray-100
      hover:shadow-lg
      transition
      "
    >


      <div className="
        flex
        items-center
        justify-between
      ">


        <div>


          <p className="
          text-gray-500
          text-sm
          ">
            {title}
          </p>



          <h2 className="
          text-3xl
          font-bold
          text-gray-800
          mt-2
          ">
            {value}
          </h2>


        </div>



        <div
          className={`
          ${color}
          text-white
          p-4
          rounded-xl
          `}
        >

          {icon}

        </div>


      </div>


    </div>

  );

}