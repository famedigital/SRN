"use client";

import { MessageSquare, PhoneCall, ShoppingBag, Menu } from "lucide-react";
import { useRfq } from "@/components/rfq/rfq-store";
import { contactPlaceholders } from "../../../content/copy";

interface MobileActionDockProps {
  onOpenMenu: () => void;
}

export function MobileActionDock({ onOpenMenu }: MobileActionDockProps) {
  const { lines, setOpen: setRfqOpen } = useRfq();

  // WhatsApp international link
  const rawPhone = contactPlaceholders.phone.replace(/[^0-9]/g, "") || "919810000000";
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    "Hello SRN Global Trade Desk, I would like to request export specifications and an institutional quote."
  )}`;

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden">
      <div className="mx-auto max-w-md rounded-2xl border border-[#C5A059]/30 bg-[#060B10]/90 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <div className="grid grid-cols-4 gap-1 items-center">
          
          {/* 1. WhatsApp Desk */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-emerald-400 hover:bg-emerald-500/10 active:scale-95 transition-all text-center"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono mt-1 font-medium tracking-tight">WhatsApp</span>
          </a>

          {/* 2. Direct Call Desk */}
          <a
            href={`tel:${contactPlaceholders.phone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-white/80 hover:text-white hover:bg-white/5 active:scale-95 transition-all text-center"
          >
            <PhoneCall className="w-5 h-5 text-[#E2C37B]" />
            <span className="text-[10px] font-mono mt-1 font-medium tracking-tight">Call Desk</span>
          </a>

          {/* 3. RFQ Basket */}
          <button
            type="button"
            onClick={() => setRfqOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-white/80 hover:text-white hover:bg-white/5 active:scale-95 transition-all text-center relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#E2C37B]" />
              {lines.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A059] to-[#E2C37B] text-[10px] font-bold text-stone-950 font-mono px-1">
                  {lines.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono mt-1 font-medium tracking-tight">
              RFQ ({lines.length})
            </span>
          </button>

          {/* 4. Full Mega Menu */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#C5A059]/20 to-[#E2C37B]/20 border border-[#C5A059]/40 text-[#F4E2B2] hover:bg-[#C5A059]/30 active:scale-95 transition-all text-center"
          >
            <Menu className="w-5 h-5 text-[#F4E2B2]" />
            <span className="text-[10px] font-mono mt-1 font-semibold tracking-tight">Menu</span>
          </button>

        </div>
      </div>
    </div>
  );
}
