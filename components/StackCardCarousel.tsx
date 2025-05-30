"use client";

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useState } from 'react';

interface Testimonial {
  image: string;
  content: string;
}

const SLIDES: Testimonial[] = [
  {
    image: '/img/testimonial2.jpg',
    content: '"Visey made it quick to find trusted resource providers for my startup. With its support, we were able to scale faster"',
  },
  {
    image: '/img/testimonial1.png',
    content: '"For our MSME, Visey helped us find reliable partners in marketing and tech. I find the marketplace a perfect place to find quality business solutions."',
  },
  {
    image: '/img/testimonial3.jpg',
    content: '"For our MSME, Visey helped us find reliable partners in marketing and tech. I find the marketplace a perfect place to find quality business solutions."',
  },
  {
    image: '/img/testimonial4.jpg',
    content: '"Thanks to Visey, we could connect with every resource provider needed to grow our early-stage MSME. It’s an invaluable resource for finding tools and services."',
  },
  {
    image: '/img/testimonial1.png',
    content: '"We found the perfect tech partners and were able to streamline our growth. It’s a must-have platform for entrepreneur support."',
  },
];

export default function StackCardCarousel({ className } : { className?: string }) {
  const [slides, setSlides] = useState<Testimonial[]>(SLIDES);

  const nextSlide = () => {
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      const lastSlide = updatedSlides.pop();
      if (lastSlide) {
        updatedSlides.unshift(lastSlide); // Moves last slide to the front
      }
      return updatedSlides;
    });
  };

  const prevSlide = () => {
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      const firstSlide = updatedSlides.shift();
      if (firstSlide) {
        updatedSlides.push(firstSlide); // Moves first slide to the end
      }
      return updatedSlides;
    });
  };

  return (
    <div>
      <div className={`card-stack w-96 lg:w-80 ${className || ''}`}>
        {slides.map((slide, idx) => {
          const activeSlide = idx === 2;
          return (
            <div
              key={idx}
              className={cn(
                `p-4 grid grid-rows-4 gap-8 card card-${
                  idx + 1
                } rounded-xl border transition-transform duration-500 ease-in-out transform`,
                activeSlide ? "bg-[#D7FF7B]" : "bg-[#FDFFF6] scale-95"
              )}
            >
              <div
                className={`relative row-span-3 ${
                  !activeSlide && "opacity-50"
                }`}
                style={{
                  background: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {activeSlide && <p className="text-center">{slide.content}</p>}
            </div>
          );
        })}
      </div>
      <div className="mt-20 mx-auto flex justify-center gap-4">
        <Button onClick={prevSlide} variant={"outline"}>
          Prev
        </Button>
        <Button onClick={nextSlide} variant={"outline"}>
          Next
        </Button>
      </div>
    </div>
  );
}
