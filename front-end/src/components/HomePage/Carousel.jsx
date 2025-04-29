import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { address } from "../../../address"; // update address here 
console.log('address =>', address);         

export default function Carousel() {
  const [gameList, setGameList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderInstance, setSliderInstance] = useState(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 5, spacing: 16 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 14 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 12 } },
      "(max-width: 480px)": { slides: { perView: 1, spacing: 10 } },
    },
    created(slider) {
      setSliderInstance(slider); // <-- store the real slider instance
      if (slider.track?.details) {
        setCurrentSlide(slider.track.details.rel);
      }
    },
    slideChanged(slider) {
      if (slider.track?.details) {
        setCurrentSlide(slider.track.details.rel);
      }
    },
  });

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(`${address}/games/all`);
      const result = await response.json();
      setGameList(result.games.slice(0, 10));
    }
    fetchGames();
  }, []);

  useEffect(() => {
    if (sliderInstance) {
      sliderInstance.update(); // update after games are fetched
    }
  }, [gameList, sliderInstance]);

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg ">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Featured Games
        </h3>
        <Link
          to="/all-games"
          className="text-sm px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold shadow"
        >
          See More
        </Link>
      </div>

      {/* Arrows */}
      {sliderInstance && (
        <>
          <button
            onClick={() => sliderInstance.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full hover:bg-black"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => sliderInstance.next()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full hover:bg-black"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider">
        {gameList.map((game) => (
          <div key={game.id} className="keen-slider__slide p-2">
            <Link to={`/games/${game.id}`}>
              <div className="bg-gray-800 rounded-lg   hover:scale-105 transition shadow p-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <img
                  src={`${address}${game.coverImage}`}
                  alt={game.gameName}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="pt-2">
                  <h4 className="text-white text-md font-semibold truncate">
                    {game.gameName}
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      {sliderInstance?.track?.details && (
        <div className="flex justify-center mt-4">
          {sliderInstance.track.details.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => sliderInstance.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full mx-1 transition ${
                currentSlide === idx ? "bg-orange-400" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
