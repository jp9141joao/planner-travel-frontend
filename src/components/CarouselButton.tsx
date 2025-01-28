import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function CustomCarousel() {
  const [api, setApi] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalSlides = 5; // Substitua pelo número real de slides

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <CarouselItem key={index}>
              {/* Conteúdo do slide */}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`mx-1 w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-black' : 'bg-gray-400'
            }`}
            onClick={() => api && api.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
