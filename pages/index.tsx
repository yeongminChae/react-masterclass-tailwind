import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { cls, makeImagePath } from "../libs/client/utils";
import {
  getMovies,
  getTvShows,
  IGetMoviesResult,
  ITvShows,
  Types,
  TypeShows,
} from "./api/Api";
import Header from "./nomflix/Components/Header";
import { useEffect, useState } from "react";
import MovieSlider from "./nomflix/Components/movieComponent/Slider/MovieSlider";
import TvSlider from "./nomflix/Components/tvComponent/Slider/TvSlider";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Home = () => {
  const { data: moData, isLoading: moIsLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getMovies(Types.top_rated)
  );
  const { data: tvData, isLoading: tvIsLoading } = useQuery<ITvShows>(
    ["tvs", "on_the_air"],
    () => getTvShows(TypeShows.on_the_air)
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className="relative overflow-hidden ">
        <Header />
        <div
          id="wraper"
          className=" h-[245vh] w-full overflow-x-hidden overflow-y-hidden bg-black"
        >
          {moIsLoading && tvIsLoading ? (
            <div
              id="loader"
              className="flex h-[20vh] items-center justify-center  "
            >
              LOADING...{" "}
            </div>
          ) : (
            <Banner
              bgPhoto={makeImagePath(moData?.results[2].backdrop_path || "")}
              className="flex h-[100vh] w-full flex-col justify-center bg-cover p-10 "
            >
              <div id="title" className="mb-4 text-4xl text-white">
                {" "}
                {moData?.results[2].title}{" "}
              </div>
              <div id="overview" className="w-1/2 text-base text-white ">
                {moData?.results[2].overview}{" "}
              </div>
            </Banner>
          )}{" "}
          <div key={"c"} className="-mt-[200px] ">
            <MovieSlider type={Types.top_rated} SliderTitle="Top Rated" />
          </div>
          <div key={"b"} className="my-[300px] ">
            <MovieSlider type={Types.popular} SliderTitle="Popular" />
          </div>
          <div className="">
            <TvSlider
              type={TypeShows.top_rated}
              SliderTitle="Top Rated Tv Series"
            />{" "}
          </div>
          <div className="my-[300px] ">
            <TvSlider
              type={TypeShows.popular}
              SliderTitle="Popular Tv Series"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
