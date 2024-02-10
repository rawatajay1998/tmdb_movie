"use client";

import { sortFunction } from "@/globalredux/features/counterSlice";
import { genreIds, options } from "@/utils/headers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Collectionsidebar = () => {
  const [channelsList, setChannelsList] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // Watch Channel Providers
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/watch/providers/movie", options)
      .then((res) => res.json())
      .then((data) => setChannelsList(data.results));
  }, []);

  // Open sidebar accordion
  const onAccordionHandler = () => {
    setOpen(!open);
  };

  // Sort by
  const onChangeHandler = (e) => {
    dispatch(sortFunction(e.target.value));
  };

  return (
    <div className="sideBar">
      <div className={open ? "card open" : "card"}>
        <div className="cardHeading" onClick={onAccordionHandler}>
          Sort
        </div>
        <div className="cardContent">
          <p className="subHeading">Sort Results By</p>
          <select onChange={onChangeHandler}>
            <option value="popularity-a">Popularity by Ascending</option>
            <option value="popularity-d">Popularity by Descending</option>
            <option value="release-d">Release by Descending</option>
            <option value="a-z">Title (A- Z)</option>
            <option value="z-a">Title (Z - A)</option>
          </select>
        </div>
      </div>
      <div
        className={open ? "card filterBYChannel open" : "card filterBYChannel"}
      >
        <div className="cardHeading" onClick={onAccordionHandler}>
          Where to Watch
        </div>
        <div className="cardContent">
          {channelsList
            .filter((item, index) => index < 10)
            .map((channel) => {
              return (
                <Image
                  key={channel.logo_path}
                  height={60}
                  width={60}
                  alt="channnel logo"
                  src={`https://image.tmdb.org/t/p/original/${channel.logo_path}`}
                />
              );
            })}
        </div>
      </div>

      {genreIds.map((item) => {
        return (
          <li className="genreLi" key={item.code} value={item.code}>
            {item.type}
          </li>
        );
      })}
    </div>
  );
};

export default Collectionsidebar;
