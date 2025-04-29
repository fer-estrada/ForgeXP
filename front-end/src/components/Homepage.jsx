import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import mockData from "../data/mockData";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function Homepage() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  return (
    <div className="relative min-h-screen text-white px-6 pt-12 overflow-hidden">
      {/* Blurred background image without text, just hammer flame and anvil */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* Overlay to darken the background image for a good UX */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Main content; come back to add carousel, other "about" refer to steam for ideas*/}
      <section className="relative z-10 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center">
        <img
          src="/images/forgexp-logo.png"
          alt="ForgeXP Logo"
          className="w-32 h-auto mb-6 drop-shadow-xl"
        />

        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-shadow-lg">
          Welcome to ForgeXP
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12">
          Dive into game reviews, connect with fellow players, and explore the
          ultimate gaming experience hub.
        </p>
      </section>
      <section>
        <h3 className="text-2xl font-bold mb-4">Featured Games</h3>
        <div className="relative">
          {/* for the slide arrows  */}
          <button
            onClick={() => slider.current?.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full hover:bg-black"
          >
            ◀
          </button>
          <button 
          onClick={() => slider.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full hover:bg-black"
          >
            ▶
          </button>

          {/* the scrollable carousel (Keen Slider) */}
          <div ref={sliderRef} className="keen-slider">
            {mockData.map((game) => (
              <div key={game.id} className="keen-slider__slide p-2">
                <Link to={`/games/${game.id}`}>
                  <div className="bg-gray-800 rounded shadow-lg overflow-hidden hover:scale-105 transition duration-300">
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
                      alt={game.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                      <h4 className="text-lg font-semibold truncate">
                        {game.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
