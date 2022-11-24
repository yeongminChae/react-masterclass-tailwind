import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../../../libs/client/utils";
import {
  getMovieDetail,
  getSearchResult,
  IGetMovieDetail,
  IGetMoviesResult,
} from "../../api/Api";

interface IMoSearch {
  keyword: any;
}

export default function MovieSearch({ keyword }: IMoSearch) {
  const router = useRouter();
  const { data } = useQuery<IGetMoviesResult>(
    ["search: " + keyword + "movie", 1],
    () =>
      getSearchResult({
        keyword: keyword,
        category: "movie",
        page: 1,
      })
  );
  const noData = data?.total_pages!! < 1;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const onBoxClicked = ({ movieId }: { movieId: number }) => {
    router.push(
      `?movieId=${data}`,
      `/Search/${movieId}?category=movies&keyword=${keyword}`,
      { scroll: false }
    );
  };
  const onOverlayClick = () => {
    router.push(`/Search/?category=movies&keyword=${keyword}`, undefined, {
      scroll: false,
    });
  };
  let moId: any = [];
  let moImg: any = [];
  let moPos: any = [];
  let moTitile: any = [];
  let moOverview: any = [];
  const clickedMovie = data?.results.map((movie) => {
    if (router.asPath.split("?")[0] === `/Search/:movieId`) {
      moId.push(String(movie.id));
      moImg.push(String(movie.backdrop_path));
      moPos.push(String(movie.poster_path));
      moTitile.push(String(movie.title));
      moOverview.push(String(movie.overview));
    }
  });
  const { data: clickedMovieDetail, isLoading: isLoadingDetail } =
    useQuery<IGetMovieDetail>(
      [router.asPath.split("/")[2].split("?")[0], "detail"],
      () => getMovieDetail(router.asPath.split("/")[2].split("?")[0])
    );
  // console.log(router.asPath.split("?")[0]);
  return (
    mounted && (
      <div className="relative overflow-hidden ">
        <div id="wraper" className="flex w-full overflow-y-hidden bg-black ">
          {noData ? (
            <span> {keyword} is not found. </span>
          ) : (
            <>
              <div key={"movie"} className="mx-10 mb-1 grid grid-cols-6 gap-2">
                {data?.results.map((movie) => (
                  <Box
                    className="mt-20 h-[10rem] cursor-pointer bg-white bg-cover bg-[center_center] text-3xl "
                    layoutId={movie.id.toString()}
                    key={movie.id}
                    variants={boxVars}
                    onClick={() => onBoxClicked({ movieId: movie.id })}
                    initial="normal"
                    whileHover="hover"
                    transition={{
                      type: "tween",
                    }}
                    bgPhoto={
                      movie.backdrop_path || movie.poster_path !== null
                        ? makeImagePath(
                            movie.backdrop_path || movie.poster_path,
                            "w500"
                          )
                        : "https://ang-projects.com/public/uploads/contents/testi-no-image.png"
                    }
                  >
                    <Info
                      variants={infoVars}
                      className="mt-[6.8rem] w-full bg-black/60 p-3 opacity-0"
                    >
                      <div className="text-center text-lg text-white">
                        {movie.title}
                      </div>
                    </Info>
                  </Box>
                ))}
              </div>
              <AnimatePresence>
                {router.asPath ===
                `/Search/${moId}?category=movies&keyword=${keyword}` ? (
                  <div className="absolute z-10">
                    <Overlay
                      onClick={onOverlayClick}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed top-10 flex h-full w-full bg-[rgba(0,0,0,0.5)] opacity-0 "
                    >
                      <BigMovie
                        layoutId={router.pathname.split("/")[2].toString()}
                        className="absolute left-0 right-0 z-[100] mx-auto h-[85vh] w-[40vw] overflow-hidden rounded-lg bg-[#2F2F2F] shadow-xl outline-none "
                        scrollY={scrollY}
                      >
                        {clickedMovie && (
                          <>
                            <BigCover
                              bgPhoto={
                                moImg || moPos !== null ? (
                                  makeImagePath(moImg || moPos, "w500")
                                ) : (
                                  <div className="bg-red-200">No image</div>
                                )
                              }
                              className="absolute top-0 h-[350px] w-full rounded-t-xl bg-cover bg-[center_center] "
                            >
                              <BigTitle className="absolute top-[18rem] p-5 text-lg text-[#fff]">
                                {moTitile}{" "}
                              </BigTitle>
                            </BigCover>
                            <div className="flex flex-col p-5 text-white ">
                              <div className="">
                                Realeased 🎥 :{" "}
                                {new Date(
                                  clickedMovieDetail?.release_date as string
                                ).getFullYear()}
                              </div>
                              <div>
                                {/* {type === Types.upcoming || */}
                                (clickedMovieDetail?.vote_average as number) ===
                                0.0 ? (<div>No Data</div>) : (
                                <div>
                                  grade ⭐️ :{" "}
                                  {Math.floor(
                                    Number(clickedMovieDetail?.vote_average) *
                                      100
                                  ) / 100}
                                  )
                                </div>
                                {/* )} */}
                              </div>
                            </div>
                            <BigOverview className="top-[-80px] inline-block flex-col px-5 text-[#fff] ">
                              <span>🎬 </span>
                              {moOverview}{" "}
                            </BigOverview>
                          </>
                        )}
                      </BigMovie>
                    </Overlay>
                  </div>
                ) : null}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    )
  );
}

const Info = styled(motion.div)``;
const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
`;
const Overlay = styled(motion.div)``;
const BigMovie = styled(motion.div)<{ scrollY: number }>`
  top: ${(props) => props.scrollY + 100}px;
`;
const BigCover = styled(motion.div)<{ bgPhoto?: any }>`
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgPhoto});
`;
const BigTitle = styled(motion.div)``;
const BigOverview = styled(motion.div)``;
const boxVars = {
  normal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
const dirVars = {
  initial: {
    opacity: 1,
  },
};
