import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

export default function YouTubeCarousel({ youtubePosts, setSelectedPost }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const currentPost = youtubePosts[currentSlide];
    if (
      currentPost &&
      currentPost.community &&
      currentPost.community.heroImage
    ) {
      setBackgroundUrl(
        `${address}${currentPost.community.heroImage}` //update address here
      );
    }
  }, [currentSlide, youtubePosts]);

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }
  function handleSeePost() {
    const selectedPost = youtubePosts[currentSlide];
    if (selectedPost) {
      setSelectedPost(selectedPost);
    }
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-10 rounded-lg overflow-hidden">
      {/* Blurred Background Hero Image */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative flex flex-col items-center justify-center p-10">
        {/* Small Carousel Container */}
        <div className="relative w-[400px]">
          {/* Arrows */}
          {sliderInstanceRef && (
            <>
              <button
                onClick={() => sliderInstanceRef.current?.prev()}
                className="absolute left-[-40px] top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-3 rounded-full z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => sliderInstanceRef.current?.next()}
                className="absolute right-[-40px] top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-3 rounded-full z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* YouTube Slides */}
          <div ref={sliderRef} className="keen-slider">
            {youtubePosts.map((post) => (
              <div
                key={post.id}
                className="keen-slider__slide flex justify-center"
              >
                <div className="w-[320px] h-[180px] bg-black rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${extractId(
                      post.content
                    )}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots and See Post button */}
        <div className="w-[400px] mt-6 flex flex-col items-center">
          {/* Dots Centered */}
          <div className="flex justify-center mb-2">
            {sliderInstanceRef.current?.track?.details.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => sliderInstanceRef.current.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full mx-1 transition ${
                  currentSlide === idx ? "bg-orange-400" : "bg-gray-500"
                }`}
              />
            ))}
          </div>

          {/* See Post Button Centered Under Dots */}
          <button
            onClick={handleSeePost}
            className="text-sm px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition mt-2"
          >
            See Post
          </button>
        </div>
      </div>
    </div>
  );
}
