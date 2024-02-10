"use client";
import "./moviepage.css";
import { useEffect, useMemo, useState } from "react";
import { loadData } from "@/globalredux/features/counterSlice";
import { options } from "@/utils/headers";
import Collectionseidebar from "@/app/components/collectionsidebar/CollectionSidebar";
import CollectionGrid from "../components/collectionGrid/CollectionGrid";
import { useDispatch, useSelector } from "react-redux";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loadPage, setoadPage] = useState(1);
  const showData = useSelector((state) => state.counter.loadMoreData);
  const filterByValue = useSelector((state) => state.counter.sortBy);
  const dispatch = useDispatch();

  console.log(filterByValue);

  //  Fetching data
  useMemo(() => {
    function fetchMovies() {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${loadPage}`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(loadData(data.results));
          console.log(showData);
        });
    }
    fetchMovies();
  }, [loadPage]);

  // Load more posts on clicking button
  const onLoadMoreHandler = () => {
    setoadPage(loadData + 1);
  };

  return (
    <div className="container">
      <h1>Popular Movie</h1>

      {showData && <CollectionGrid movies={movies} showData={showData} />}

      {/* <button className="loadMore-btn" onClick={onLoadMoreHandler}>
        Load More
      </button> */}
    </div>
  );
}
