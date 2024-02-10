"use client";

import { options } from "@/utils/headers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./searchPage.css";
import Link from "next/link";

const SearchPage = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);

  const searchedQuery = useSelector((state) => state.counter.searchedMovie);
  // Fetching searched movies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchedQuery}`,
      options
    )
      .then((res) => res.json())
      .then((data) => setSearchedMovies(data.results));
  }, [searchedQuery]);

  console.log(searchedMovies);
  return (
    <div>
      <div className="container">
        <h2>Search Results</h2>
        <div className="SearchResults">
          {searchedMovies.map((movie) => {
            return (
              <div className="searchedMovie" key={movie.id}>
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    width={100}
                    height={100}
                    alt="searched movie"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                </Link>
                <div className="about">
                  <Link className="title" href={`/movie/${movie.id}`}>
                    <p>{movie.title}</p>
                  </Link>
                  <p className="releaaseDte">{movie.release_date}</p>
                  <p className="overview">{movie.overview}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
