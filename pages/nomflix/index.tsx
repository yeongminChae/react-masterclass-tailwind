import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { cls, makeImagePath } from "../../libs/client/utils";
import {
  getPopularMovies,
  getTopRatedMovies,
  IGetMoviesResult,
} from "../api/movieApi";
import Header from "./Components/Header";
import MovieInfo from "./Components/movieComponent/MovieInfo/MovieInfo";
import SliderTopRated from "./Components/movieComponent/Slider/SliderTopRated";
import SliderPopular from "./Components/movieComponent/Slider/SliderPopular";
import { getPopularTv, getTopRatedTv, IGetTvResult } from "../api/tvApi";
import SliderPopularTv from "./Components/tvComponent/Slider/SliderPopularTv";
import SliderTopRatedTv from "./Components/tvComponent/Slider/SliderTopRatedTv";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Home: NextPage = () => {
  const { data: popularData, isLoading: latestIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "Latest"], getPopularMovies);
  const { data: top_ratedData, isLoading: top_ratedIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "TopRated"], getTopRatedMovies);
  const { data: popularTvData, isLoading: latestTvIsLoading } =
    useQuery<IGetTvResult>(["tv", "LatestTv"], getPopularTv);
  const { data: top_ratedTvData, isLoading: top_ratedTvIsLoading } =
    useQuery<IGetTvResult>(["tv", "TopRatedTv"], getTopRatedTv);
  const isLoading =
    latestTvIsLoading &&
    latestIsLoading &&
    top_ratedIsLoading &&
    top_ratedTvIsLoading;
  return (
    <div className="relative overflow-hidden ">
      <Header />
      <div id="wraper" className=" h-[245vh] w-full overflow-x-hidden bg-black">
        {isLoading ? (
          <div
            id="loader"
            className="flex h-[20vh] items-center justify-center  "
          >
            LOADING...{" "}
          </div>
        ) : (
          <Banner
            bgPhoto={makeImagePath(
              top_ratedData?.results[0].backdrop_path || ""
            )}
            className="flex h-[100vh] w-full flex-col justify-center bg-cover p-10 "
          >
            <div id="title" className="mb-4 text-4xl text-white">
              {" "}
              {top_ratedData?.results[0].title}{" "}
            </div>
            <div id="overview" className="w-1/2 text-base text-white ">
              {top_ratedData?.results[0].overview}{" "}
            </div>
          </Banner>
        )}{" "}
        <div className="">
          <SliderTopRated SliderTitle="Top Rated Movies" />
        </div>
        <div className="my-[300px] ">
          <SliderPopularTv SliderTitle="Top Rated Tv Series" />
        </div>
        <div className="my-[300px] ">
          <SliderPopular SliderTitle="Popular Movies" />
        </div>
        <div className="my-[300px] ">
          <SliderTopRatedTv SliderTitle="Popular Tv Series" />
        </div>
        <MovieInfo />
      </div>
    </div>
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
