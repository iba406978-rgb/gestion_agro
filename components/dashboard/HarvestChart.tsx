"use client";


import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 CartesianGrid
} from "recharts";



type Props = {

data:{
mois:string;
quantite:number;
}[];

};



export default function HarvestChart({data}:Props){


return (

<div className="
bg-white
rounded-2xl
border
border-green-100
p-6
shadow-sm
">


<h2 className="
text-xl
font-bold
mb-5
text-gray-800
">

Production mensuelle

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart data={data}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="mois"/>


<YAxis/>


<Tooltip/>


<Bar
dataKey="quantite"
fill="#22c55e"
/>


</BarChart>


</ResponsiveContainer>


</div>

);


}