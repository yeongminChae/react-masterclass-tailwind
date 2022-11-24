import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../../../libs/client/utils";
import Header from "../Components/Header";
import MovieSearch from "../Components/MovieSearch";

const Search = () => {
  const router = useRouter();
  const keyword = router.asPath.split("/")[2].split("=")[2];
  const [cat, setCat] = useState("movies" || "Tvs");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const onBoxClicked = ({ movieId }: { movieId: number }) => {
    router.push(`/search/${movieId}?category=movies&keyword=${keyword}`);
  };
  return (
    mounted && (
      <div className="relative overflow-hidden ">
        <Header />
        <div
          id="wraper"
          className="flex h-[245vh] w-full flex-col overflow-x-hidden bg-black "
        >
          <Keyword className="mt-20 ml-10 text-lg text-red-400">
            This is what I found to &apos;{keyword}&apos;
          </Keyword>
          {/* @ts-ignore */}
          <MovieSearch keyword={keyword} />
        </div>
      </div>
    )
  );
};
const Keyword = styled.h1``;

const btnVariants = {
  start: {
    width: "60px",
    height: "60px",
  },
  end: ({ category }: { category: boolean }) => ({
    width: category ? "120px" : "60px",
    height: category ? "120px" : "60px",
    transition: {
      duration: 0.4,
      type: "tween",
    },
    opacity: category ? 1 : 0.3,
  }),
};

const btnTextVariants = {
  start: {
    fontSize: "8px",
  },
  end: ({ category }: { category: boolean }) => ({
    fontSize: category ? "16px" : "8px",
    fontWeight: category ? 600 : 300,
    transition: {
      duration: 0.4,
      type: "tween",
    },
    opacity: category ? 1 : 0.3,
  }),
};

export default Search;
