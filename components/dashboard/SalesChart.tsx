"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


type Props = {
  data:{
    mois:string;
    total:number;
  }[];
};



export default function SalesChart({data}:Props){


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

Evolution des ventes

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<LineChart data={data}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="mois"/>


<YAxis/>


<Tooltip/>


<Line
type="monotone"
dataKey="total"
stroke="#16a34a"
strokeWidth={3}
/>


</LineChart>


</ResponsiveContainer>



</div>

);


}