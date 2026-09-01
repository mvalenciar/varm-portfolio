"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockTrafficData = [
  { name: "Lun", visitas: 12 },
  { name: "Mar", visitas: 19 },
  { name: "Mié", visitas: 32 },
  { name: "Jue", visitas: 54 },
  { name: "Vie", visitas: 45 },
  { name: "Sáb", visitas: 23 },
  { name: "Dom", visitas: 38 },
];

export default function TrafficChart() {
  return (
    <section className="border border-stone-200 bg-white p-4 md:p-6 shadow-sm overflow-hidden w-full animate-fadeIn">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-950">
            Tráfico del Portafolio
          </h2>
          <p className="text-[10px] font-medium text-stone-500 mt-0.5">
            Visitas únicas por día de la semana actual
          </p>
        </div>
        <div className="w-fit border border-stone-300 rounded-sm bg-stone-50 px-2 py-1 text-[10px] font-bold tracking-wider uppercase text-stone-600">
          Últimos 7 Días
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full text-[10px] sm:text-xs min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockTrafficData}
            margin={{ top: 10, right: 20, left: -25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eded" />
            <XAxis dataKey="name" stroke="#78716c" tickLine={false} dy={10} />
            <YAxis stroke="#78716c" tickLine={false} dx={5} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e7e5e4",
                borderRadius: "2px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#1c1917" }}
            />
            <Line
              type="monotone"
              dataKey="visitas"
              stroke="#dc2626"
              strokeWidth={3}
              activeDot={{ r: 6 }}
              dot={{ r: 4, stroke: "#dc2626", strokeWidth: 1, fill: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
