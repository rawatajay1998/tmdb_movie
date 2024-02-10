import Image from "next/image";
import PopularMovies from "./popularMovies";
import TrendingMovies from "./trendingMovies";
import HomeBanner from "../../public/home-banner.jpg";
import SearchWrapperHome from "./components/SearchWrapperHome";

export default async function Home() {
  return (
    <div className="home">
      <div className="bannerWrapper">
        <Image src={HomeBanner} width={1399} height={600} alt="home banner" />

        <div className="bannerContent">
          <h2>Welcome</h2>
          <p className="subHeading">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <SearchWrapperHome />
        </div>
      </div>
      <TrendingMovies />
      <PopularMovies />
    </div>
  );
}
