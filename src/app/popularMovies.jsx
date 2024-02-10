import Image from "next/image";
import bgImage from "../../public/background-home.svg";
import Link from "next/link";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2IwZTRlYmM1YzA2N2QwNGE1YzIzZGFjYzQwYTVjNCIsInN1YiI6IjY0YzkyY2Q1NWNlYTE4MDEzZDUyNjIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GTUZLgkM5ZQN-2WaZ730yIKAwJJ-ayv88Ixo78xLx48",
  },
};
async function getTrending() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const resData = await res.json();
  return resData.results;
}

export default async function PopularMovies() {
  const moviesTrending = await getTrending();

  return (
    <div className="home-popular">
      <div className="container">
        <h2>Popular</h2>
        <div
          className="homeMovies_Wrapper"
          style={{ backgroundImage: `url(${bgImage.src})` }}
        >
          {moviesTrending.map((item) => {
            const poster_path = item.poster_path;
            const vote_average = item.vote_average * 10;
            return (
              <Link href={`/movie/${item.id}`}>
                <div className="imgWrapper">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    width={150}
                    height={225}
                    alt={item.id}
                  />
                  <span
                    className={
                      vote_average > 70
                        ? `voteAverage green`
                        : `voteAverage yellow`
                    }
                  >
                    {Math.floor(vote_average)}%
                  </span>
                </div>

                <h4>{item.title}</h4>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
