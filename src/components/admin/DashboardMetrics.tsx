"use client";

import { useAdminMetrics } from "@/hooks/useAdminMetrics";

export default function DashboardMetrics() {
  const { cardsConfig, isLoading } = useAdminMetrics();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cardsConfig.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="border border-stone-200 bg-white p-4 shadow-sm rounded-sm flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                {card.title}
              </span>
              <h3 className="text-xl font-black text-stone-900 font-mono">
                {isLoading ? (
                  <span className="text-xs text-stone-300 animate-pulse">
                    ...
                  </span>
                ) : (
                  card.value
                )}
              </h3>
            </div>
            <div className={`p-2 border rounded-sm ${card.color}`}>
              <IconComponent className="h-4 w-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
