"use client";

import { useEffect, useState } from "react";

interface LiveClockProps {
  className?: string;
  showMultiZone?: boolean;
}

export function LiveClock({ className = "", showMultiZone = false }: LiveClockProps) {
  const [time, setTime] = useState<{ ist: string; utc: string; isMarketOpen: boolean } | null>(null);

  useEffect(() => {
    function updateClock() {
      const now = new Date();

      // Format Indian Standard Time (Asia/Kolkata)
      const istFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // Format UTC
      const utcFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Market Hours IST: Monday-Friday 09:30 to 18:30 IST
      const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const day = istDate.getDay(); // 0 = Sun, 6 = Sat
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      const isMarketOpen = day >= 1 && day <= 5 && timeInMinutes >= 9 * 60 + 30 && timeInMinutes <= 18 * 60 + 30;

      setTime({
        ist: istFormatter.format(now),
        utc: utcFormatter.format(now),
        isMarketOpen,
      });
    }

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className={`font-mono text-xs text-white/50 flex items-center gap-2 ${className}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>KOLKATA HQ: 09:30 IST · MARKET DESK OPEN</span>
      </div>
    );
  }

  if (showMultiZone) {
    return (
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs ${className}`}>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              time.isMarketOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          <span className="font-semibold text-white/70">KOLKATA / MUMBAI:</span>
          <span className="text-white">{time.ist} IST</span>
          <span className="text-[10px] text-white/40">
            ({time.isMarketOpen ? "DESK ACTIVE" : "AFTER HOURS"})
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-white/50">
          <span>UTC:</span>
          <span className="text-white/80">{time.utc}Z</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`font-mono text-xs flex items-center gap-2.5 ${className}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          time.isMarketOpen ? "bg-emerald-400 animate-pulse" : "bg-emerald-400"
        }`}
      />
      <span className="font-medium text-white/70">KOLKATA HQ:</span>
      <span className="text-white font-mono">{time.ist} IST</span>
      <span className="hidden xl:inline text-white/40">
        · {time.isMarketOpen ? "LIVE TRADE DESK OPEN" : "INQUIRY QUEUE ACTIVE"}
      </span>
    </div>
  );
}
