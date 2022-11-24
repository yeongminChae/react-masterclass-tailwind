import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { makeImagePath } from "../../../libs/client/utils";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { getTvShows, ITvShows, TypeShows } from "../../api/Api";
import TvSlider from "../Components/tvComponent/Slider/TvSlider";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Tv = () => {
  const { data, isLoading } = useQuery<ITvShows>(["tvs", "on_the_air"], () =>
    getTvShows(TypeShows.on_the_air)
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className="absolute overflow-x-hidden ">
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
              className="flex h-[100vh] w-[99vw] flex-col justify-center bg-cover p-10 "
            >
              <div id="title" className="mb-4 text-4xl text-white">
                {" "}
                {data?.results[1].name}{" "}
              </div>
              <div id="overview" className="w-1/2 text-base text-white ">
                {data?.results[1].overview}{" "}
              </div>
            </Banner>
          )}
          <div className="-mt-[200px] ">
            <TvSlider
              type={TypeShows.top_rated}
              SliderTitle="Top Rated Tv Series"
            />{" "}
          </div>
          <div className="my-[300px]">
            <TvSlider
              type={TypeShows.airing_today}
              SliderTitle="On The Air Series"
            />{" "}
          </div>
          <div className="my-[300px] ">
            <TvSlider
              type={TypeShows.popular}
              SliderTitle="Popular Tv Series"
            />
          </div>
          <div className="my-[300px] ">
            <TvSlider
              type={TypeShows.on_the_air}
              SliderTitle="Airing Today Series "
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Tv;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
