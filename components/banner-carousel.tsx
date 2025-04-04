"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const banners = [
  {
    id: 1,
    title: "Mirá Todos Nuestros Productos",
    description: "Baterías, cargadores y más soluciones energéticas",
    image: "/placeholder.svg?height=600&width=1200",
    button: {
      text: "Ver Productos",
      href: "/productos",
    },
  },
  {
    id: 2,
    title: "¿Querés Comprar o Vender?",
    description: "Dejanos ayudarte a elegir o vender tu batería",
    image: "/placeholder.svg?height=600&width=1200",
    dualButtons: true,
  },
  {
    id: 3,
    title: "Servicio Técnico Especializado",
    description: "Asesoramiento profesional para su mejor elección",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={banner.image || "/placeholder.svg"}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4 text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{banner.title}</h2>
            <p className="text-xl md:text-2xl">{banner.description}</p>

            {banner.button && (
              <Link href={banner.button.href}>
                <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                  {banner.button.text}
                </button>
              </Link>
            )}

            {banner.dualButtons && (
              <div className="flex space-x-4 mt-4">
                <a href="#contacto">
                  <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                    Quiero Comprar
                  </button>
                </a>
                <a href="#contacto">
                  <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                    Quiero Vender
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-primary" : "bg-white bg-opacity-50"}`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}