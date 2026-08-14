import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    name: "Silk Sarees",
    eyebrow: "Timeless Elegance For Every Occasion",
    image:
      "https://www.kollybollyethnics.com/image/catalog/data/07Oct2022/Silk-Saree-with-blouse-in-Light-green-colour-1465.jpg",
  },
  {
    name: "Cotton Sarees",
    eyebrow: "Everyday Comfort, Effortless Grace",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.DfSHyM23JjTzqesEQyoK5AHaKd?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Banarasi Sarees",
    eyebrow: "Heritage Woven In Gold",
    image:
      "https://media.urbanwomania.com/wp-content/uploads/2023/05/Japanese-Violet-Banarasi-Saree.webp",
  },
  {
    name: "Kanjivaram",
    eyebrow: "South India's Bridal Treasure",
    image:
      "https://i.pinimg.com/originals/4a/ed/d6/4aedd6e771a5ab94d026740498c94fb2.jpg",
  },
  {
    name: "Organza",
    eyebrow: "Sheer, Light, Luminous",
    image:
      "https://i.pinimg.com/originals/5d/2c/03/5d2c03f53e720be28a31fc2fa6c3dd76.jpg",
  },
  {
    name: "Chiffon",
    eyebrow: "Flowing Elegance For Every Day",
    image:
      "https://cdn.shopify.com/s/files/1/1760/4649/products/chiffon-saree-blue-dual-tone-chiffon-saree-silk-saree-online-32030640963777_450x@2x.jpg?v=1651304826",
  },
  {
    name: "Linen",
    eyebrow: "Breathable, Natural, Refined",
    image:
      "https://th.bing.com/th/id/OIP.U3Ob0lW4S5Z5IiCsJcd1EwHaJS?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Party Wear",
    eyebrow: "Statement Drapes For The Spotlight",
    image:
      "https://ik.imagekit.io/ldqsn9vvwgg/images/1873409.jpg?tr=w-800,h-800,fo-auto",
  },
];

const AUTOPLAY_MS = 3000;

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef(null);

  const goTo = useCallback(
    (i) => setIndex(((i % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, total]);

  const slide = slides[index];

  return (
    <div className="bg-[#FFF8F0] px-4 md:px-10 py-8 md:py-12">
      <section
        className="relative overflow-hidden bg-[#1c1c1c] rounded-[28px] shadow-2xl"
        style={{ height: "min(90vh, 880px)", minHeight: "560px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Blurred background, changes with slide */}
        {slides.map((s, i) => (
          <div
            key={s.name}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden="true"
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover scale-125 blur-md saturate-[1.15] brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        ))}

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 text-[#8B1E3F] flex items-center justify-center shadow-xl transition-all duration-200"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 text-[#8B1E3F] flex items-center justify-center shadow-xl transition-all duration-200"
        >
          <ChevronRight size={22} />
        </button>

        {/* Content: single centered image, text overlaid bottom-left */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 md:px-10 py-10 md:py-14 flex items-center justify-center">
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black/20 shadow-[0_30px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/15">
            {/* image, contained + centered within its box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.name}
                className="max-w-full max-h-full w-auto h-auto object-contain animate-[fadeIn_0.7s_ease]"
              />
            </div>

            {/* scrim so text stays legible over the image */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* text, bottom-left, with entrance effect keyed to slide */}
            <div
              key={`text-${index}`}
              className="absolute left-6 bottom-6 md:left-10 md:bottom-10 max-w-md animate-[slideUp_0.6s_cubic-bezier(0.22,1,0.36,1)]"
            >
              <p className="text-[#D9B24C] uppercase tracking-[4px] font-semibold text-xs md:text-sm mb-3">
                {slide.eyebrow}
              </p>
              <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                {slide.name}
              </h2>
              <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/25 border border-white/40 text-white font-medium px-6 py-3 rounded-full transition backdrop-blur-sm">
                Explore Collection
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/25 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
          {slides.map((s, i) => (
            <button
              key={s.name}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(1.02); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Carousel;
