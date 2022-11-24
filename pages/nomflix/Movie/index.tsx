import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, Types } from "../../api/Api";
import Header from "../Components/Header";
import { makeImagePath } from "../../../libs/client/utils";
import SliderNowPlaying from "../Components/movieComponent/Slider/MovieSlider";
import { useEffect, useState } from "react";
import MovieSlider from "../Components/movieComponent/Slider/MovieSlider";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Movie = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getMovies(Types.top_rated)
  );
  const bannerIndex = 0;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className="absolute overflow-hidden ">
        <Header />
        <div
          id="wraper"
          className=" h-[245vh] w-full overflow-hidden overflow-x-hidden bg-black"
        >
          {isLoading ? (
            <div
              id="loader"
              className="flex h-[20vh] items-center justify-center  "
            >
              LOADING...{" "}
            </div>
          ) : (
            <Banner
              bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")}
              className="flex h-[100vh] w-full flex-col justify-center bg-cover p-10 "
            >
              <div id="title" className="mb-4 text-4xl text-white">
                {" "}
                {data?.results[1].title}{" "}
              </div>
              <div id="overview" className="w-1/2 text-base text-white ">
                {data?.results[1].overview}{" "}
              </div>
            </Banner>
          )}{" "}
          <div key={"c"} className="-mt-[200px] ">
            <MovieSlider type={Types.top_rated} SliderTitle="Top Rated" />
          </div>
          <div key={"a"} className="my-[300px] ">
            <MovieSlider type={Types.now_playing} SliderTitle="Now Playing" />
          </div>
          <div key={"b"} className="my-[300px] ">
            <MovieSlider type={Types.popular} SliderTitle="Popular" />
          </div>
          <div key={"D"} className="my-[300px] ">
            <MovieSlider type={Types.upcoming} SliderTitle="Upcoming" />
          </div>
        </div>
      </div>
    )
  );
};

export default Movie;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
