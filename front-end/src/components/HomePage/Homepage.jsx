import HomeIntro from "./HomeIntro";
import Carousel from "./Carousel";
import HomePagePosts from "./HomepagePosts";
import HomePageUserSearch from "./HomepageUserSerach";
import { address } from "../../../address"; //update address here
console.log('address =>', address);     

export default function Homepage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Main content routing in homeIntro and Carousel */}
        <main className="flex-grow px-6 pt-12 w-full flex flex-col gap-8">
          <HomeIntro />

          <div className="w-full flex justify-between items-start gap-4 overflow-hidden px-6 sm:px-8 md:px-12 lg:px-20 ">
            <div className="flex-1 min-w-[0]">
              <Carousel />
            </div>
          </div>
        </main>
        <div className="w-full flex justify-center">
          <HomePageUserSearch />
        </div>
      </div>

      <HomePagePosts />
    </div>
  );
}
