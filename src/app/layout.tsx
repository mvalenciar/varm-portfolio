import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import FurinBell from "@/components/FurinBell";
import SakuraCanvas from "@/components/SakuraCanvas";
import AudioController from "@/components/AudioController";
import { AudioProvider } from "@/context/AudioContext";

const amanojakuFont = localFont({
  src: "../assets/fonts/Amanojaku.otf",
  variable: "--font-pincel",
});

const yuzarsifFont = localFont({
  src: "../assets/fonts/Yuzarsif.ttf",
  variable: "--font-yuzarsif",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es"
      className={`${amanojakuFont.variable} ${yuzarsifFont.variable}`}
    >
      <body className="antialiased min-h-screen h-screen overflow-hidden relative text-stone-800">
        <AudioProvider>
          {/* Simulación física de fondo */}
          <SakuraCanvas />

          {/* Controladores de interacción personalizados */}
          <CustomCursor />
          <FurinBell />
          <AudioController />

          {/* Background fijo */}
          <div className="fixed inset-0 -z-20 w-full h-full pointer-events-none select-none">
            <Image
              src="/images/sakura-bg.jpg"
              alt="Fondo tradicional japonés con Monte Fuji"
              fill
              priority
              className="object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-stone-100/10 backdrop-blur-[0.5px]" />
          </div>

          <div className="relative z-10 h-full w-full">{children}</div>
        </AudioProvider>
      </body>
    </html>
  );
}
