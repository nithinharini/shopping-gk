import React, { useEffect, useState } from "react";
import Button from "../common/button";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "iPhone 15",
    subtitle: "Experience the next generation of Apple innovation.",
    points: [
      "Advanced camera system",
      "Fast performance and smooth experience",
      "Elegant premium design",
    ],
    image: "https://picsum.photos/700/500?iphone15",
    bg: "bg-slate-900",
  },
  {
    id: 2,
    title: "MacBook Air",
    subtitle: "Lightweight laptop with powerful performance for work and life.",
    points: [
      "Slim and portable design",
      "Long battery backup",
      "Perfect for study and office work",
    ],
    image: "https://picsum.photos/700/500?macbook",
    bg: "bg-blue-900",
  },
  {
    id: 3,
    title: "Samsung Galaxy",
    subtitle: "Premium Android experience with stunning display and speed.",
    points: [
      "Vibrant AMOLED display",
      "Excellent camera quality",
      "Powerful all-day performance",
    ],
    image: "https://picsum.photos/700/500?samsung",
    bg: "bg-purple-900",
  },
  {
    id: 4,
    title: "Smart TV",
    subtitle: "Bring cinema-quality entertainment to your living room.",
    points: [
      "4K Ultra HD picture",
      "Smart apps and streaming",
      "Immersive sound experience",
    ],
    image: "https://picsum.photos/700/500?tv",
    bg: "bg-emerald-900",
  },
  {
    id: 5,
    title: "Gaming Console",
    subtitle: "Play your favorite games with speed and stunning graphics.",
    points: [
      "Fast loading performance",
      "Realistic graphics",
      "Next-level gaming experience",
    ],
    image: "https://picsum.photos/700/500?gaming",
    bg: "bg-red-900",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className={`rounded-3xl ${activeSlide.bg} text-white overflow-hidden`}>
      <div className="grid items-center gap-8 px-8 py-10 lg:grid-cols-2 lg:px-12 lg:py-14">
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-300">
            GK Electronic
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
            {activeSlide.title}
          </h1>

          <p className="mb-6 max-w-xl text-base text-slate-200 lg:text-lg">
            {activeSlide.subtitle}
          </p>

          <ul className="mb-8 space-y-2 text-sm text-slate-200 lg:text-base">
            {activeSlide.points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/products")}>
              Shop Now
            </Button>
            <Button
              variant="outline"
              className="bg-white text-slate-900"
              onClick={() => navigate("/products")}
            >
              View Products
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="max-h-[340px] w-auto rounded-2xl object-contain shadow-xl lg:max-h-[420px]"
          />
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-6">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === activeIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}