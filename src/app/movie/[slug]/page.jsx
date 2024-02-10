import Image from "next/image";
import "./singlemoviepage.css";
import MovieTrailer from "@/app/components/movieTrailer";
import { options, fetchMovieApi } from "@/utils/headers";
import ProfileDefaultPic from "../../../../public/profile_default.png";

// Get movie details
async function getMovie(slug) {
  const res = await fetch(`${fetchMovieApi}${slug}`, options);
  if (!res.ok) {
    console.log(options);
    throw Error("something went wrong");
  }

  return res.json();
}
console.log(options);

// Get movie credits
async function getMovieCredits(slug) {
  const res = await fetch(`${fetchMovieApi}${slug}/credits`, options);
  if (!res.ok) {
    throw Error("something went wrong");
  }

  const credits = res.json();

  return credits;
}

// Get recommended movies
async function recommendedMovies(slug) {
  const res = await fetch(
    `${fetchMovieApi}${slug}/recommendations?language=en-US&page=1`,
    options
  );
  if (!res.ok) {
    throw Error("something went wrong");
  }

  const data = res.json();

  return data;
}

// Get movie videos
async function getVideos(slug) {
  const res = await fetch(
    `${fetchMovieApi}${slug}/videos?language=en-US&page=1`,
    options
  );
  if (!res.ok) {
    throw Error("something went wrong");
  }

  const data = await res.json();
  const videos = await data.results;

  return videos;
}

export default async function MoviePage({ params }) {
  const { slug } = params;

  let singleMovie = await getMovie(slug);
  let movieCredits = await getMovieCredits(slug);
  let { results } = await recommendedMovies(slug);
  let movieMedia = await getVideos(slug);

  const {
    title,
    vote_average,
    poster_path,
    overview,
    genres,
    tagline,
    backdrop_path,
    status,
    original_language,
    budget,
    revenue,
    imdb_id,
    adult,
  } = singleMovie;

  const { cast } = movieCredits;

  // Convert to currency
  function noToCurrencyConverter(num) {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <div>
      <div
        className="bannerContentWrapper"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px),
            rgba(31.5, 10.5, 10.5, 0.84) 50%,
            rgba(31.5, 10.5, 10.5, 0.84) 100%
          ),url(https://image.tmdb.org/t/p/original/${backdrop_path}c)`,
        }}
      >
        <div className="container">
          <div className="bannerContent">
            <div className="left-content">
              <Image
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                width={300}
                height={450}
                alt={title}
              />
            </div>
            <div className="right-content">
              <h2>{title}</h2>
              <ul className="genres">
                {genres.map((item) => {
                  return <li key={item.name}>{item.name}</li>;
                })}
              </ul>
              <p className="vote">
                <span
                  className={
                    vote_average > 70
                      ? `voteAverage green`
                      : `voteAverage yellow`
                  }
                >
                  {Math.floor(vote_average * 10)}%
                </span>
                <span>User Score</span>
              </p>
              <span className="tagline">{tagline}</span>
              <h3>Overview</h3>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="movieGrid">
        <div className="movieLeftSide">
          <div className="container">
            <div className="creditsContainer">
              {cast.map((crew) => {
                console.log(crew.profilePath);
                return (
                  <div className="castBlock" key={crew.name}>
                    <div
                      className={
                        crew.profile_path === null ? "defaultImg" : null
                      }
                    >
                      <Image
                        src={
                          crew.profile_path === null
                            ? ProfileDefaultPic
                            : `https://image.tmdb.org/t/p/original/${crew.profile_path}`
                        }
                        width={138}
                        height={175}
                        alt={crew.name}
                        className="profileImg"
                      />
                    </div>
                    <p className="crewName">{crew.name}</p>
                    <p className="characterName">{crew.character}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container">
            <div className="recommendedMovies_container">
              {results.map((movie) => {
                return (
                  <div className="recMovie_block">
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                      width={250}
                      height={141}
                      alt={movie.title}
                      className="profileImg"
                    />
                    <h4>{movie.title}</h4>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container">
            <div className="movieVideo">
              {/* {movieMedia && <MovieTrailer videos={movieMedia} />} */}
            </div>
          </div>
        </div>
        <div className="movieRightSide">
          <div className="block">
            <p className="subHeading">Status</p>
            <p>{status}</p>
          </div>
          <div className="block">
            <p className="subHeading">Adult</p>
            <p>{adult ? "18+" : "Under 18"}</p>
          </div>
          <div className="block">
            <p className="subHeading">Original Language</p>
            <p>{original_language}</p>
          </div>
          <div className="block">
            <p className="subHeading">Budget</p>
            <p>
              {budget == 0 ? "Not disclosed" : noToCurrencyConverter(budget)}
            </p>
          </div>
          <div className="block">
            <p className="subHeading">Revenue</p>
            <p>
              {revenue == 0 ? "Not disclosed" : noToCurrencyConverter(revenue)}
            </p>
          </div>
          <div className="block">
            <p className="subHeading">IMDB Id</p>
            <p>{imdb_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
