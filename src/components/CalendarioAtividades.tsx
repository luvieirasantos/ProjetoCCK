"use client";

import { calendarioAtividades } from "@/data/calendarioAtividades";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function CalendarioAtividades() {
  return (
    <section className="py-14 px-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-black mb-10 tracking-tight">
        Calendário de Atividades – 1º Semestre
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true }}
          autoHeight
        >
          {calendarioAtividades.map((mes) => (
            <SwiperSlide key={mes.mes}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center w-full h-auto transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-semibold uppercase text-black mb-4">
                  {mes.mes}
                </h3>
                {mes.dias.map((dia, index) => (
                  <div key={index} className="mb-4 text-sm sm:text-base">
                    <p className="font-medium text-gray-700">{dia.data}</p>
                    <ul className="mt-1 text-gray-600 space-y-1">
                      {dia.atividades.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Setas externas e minimalistas */}
        <button
          className="swiper-button-prev-custom absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 z-10 text-black hover:opacity-60 transition"
          aria-label="Mês anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="M15 18L9 12l6-6" />
          </svg>
        </button>

        <button
          className="swiper-button-next-custom absolute right-[-2.5rem] top-1/2 transform -translate-y-1/2 z-10 text-black hover:opacity-60 transition"
          aria-label="Próximo mês"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
