"use client";

import counterSlice, { search } from "@/globalredux/features/counterSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchWrapperHome = () => {
  const [searchedvalue, setSearchedvalue] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  // on search handler function
  const onchangeHandler = (e) => {
    setSearchedvalue(e.target.value);
  };

  // redirecting user to search page on button click
  const onSearchHandler = () => {
    router.push("/search");

    // Dispatch value to redux store
    dispatch(search(searchedvalue));
  };

  return (
    <div className="searchWrapper">
      <input type="text" onChange={onchangeHandler} />
      <button onClick={onSearchHandler}>Search</button>
    </div>
  );
};

export default SearchWrapperHome;
