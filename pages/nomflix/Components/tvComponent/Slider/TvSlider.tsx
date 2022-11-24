import { Query, useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { cls, makeImagePath } from "../../../../../libs/client/utils";
import {
  Types,
  ITvShows,
  ITvShowsDetail,
  getTvShows,
  TypeShows,
  getTvShowsDetail,
} from "../../../../api/Api";
// import cls  from "../../../../../libs/client/utils";

interface ISlider {
  SliderTitle: string;
}

export default function TvSlider({
  type,
  SliderTitle,
}: {
  type: TypeShows;
  SliderTitle: string;
}) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState<boolean>(false);
  const { data, isLoading } = useQuery<ITvShows>(["tvs", type], () =>
    getTvShows(type)
  );
  const onBoxClick = ({
    tvId,
    category,
  }: {
    tvId: number;
    category: string;
  }) => {
    router.push(`?tvId=${data}`, `/nomflix/Tv/${category}/${tvId}`, {
      scroll: false,
    });
  };
  useEffect(() => {
    clicked;
    setClicked;
  }, [clicked, setClicked]);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totaltvs = data?.results.length - 1;
      const maxIndex = Math.floor(totaltvs / offset) - 1; // index = page
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totaltvs = data?.results.length - 1;
      const maxIndex = Math.floor(totaltvs / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const offset = 6;
  const customValue = {
    direction: back,
  };
  let tvId: any = [];
  let tvImg: any = [];
  let tvPos: any = [];
  let tvTitile: any = [];
  let tvOverview: any = [];
  const clickedTv = data?.results.map((tv) => {
    if (router.asPath === `/nomflix/Tv/${type}/${tv.id}`) {
      tvId.push(String(tv.id));
      tvImg.push(String(tv.backdrop_path));
      tvPos.push(String(tv.poster_path));
      tvTitile.push(String(tv.name));
      if (tv.overview.length === 0) {
        tvOverview.push("It will be updated");
      } else {
        tvOverview.push(String(tv.overview));
      }
    }
  });
  const onOverlayClick = () => {
    if (router.pathname === "/") {
      router.push("/", undefined, { scroll: false });
    } else if (router.pathname === "/nomflix/Tv") {
      router.push("/nomflix/Tv", undefined, { scroll: false });
    }
  };
  const { data: clickedTvDetail, isLoading: isLoadingDetail } =
    useQuery<ITvShowsDetail>([router.asPath.split("/")[4], "detail"], () =>
      getTvShowsDetail(router.asPath.split("/")[4])
    );
  return (
    <Slider className="z-0 -mt-20 ">
      <div className="mx-10 mb-2 text-xl text-white/90 ">{SliderTitle}</div>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        mode="sync"
        custom={customValue.direction}
      >
        <div>
          {type === TypeShows.airing_today
            ? "airing today"
            : type === TypeShows.top_rated
            ? "top rated"
            : type === TypeShows.on_the_air
            ? "on the air"
            : type}
        </div>
        <Row
          variants={rowVars}
          initial="hidden"
          animate="visible"
          custom={customValue.direction}
          exit="exit"
          key={type + index}
          transition={{ type: "tween", duration: 1 }}
          className="absolute mx-10 mb-1 grid w-[93.5vw] grid-cols-6 gap-2"
        >
          {data?.results &&
            data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tv: any) => (
                <Box
                  className="h-40 cursor-pointer bg-white bg-cover bg-[center_center] text-3xl 
            text-red-500 first:origin-[center_left] last:origin-[center_right]"
                  key={type + tv.id}
                  layoutId={type + tv.id + ""}
                  onClick={() => onBoxClick({ tvId: tv.id, category: type })}
                  variants={boxVars}
                  initial="normal"
                  whileHover="hover"
                  bgPhoto={
                    tv.backdrop_path || tv.poster_path !== null
                      ? makeImagePath(
                          tv.backdrop_path || tv.poster_path,
                          "w500"
                        )
                      : "https://ang-projects.com/public/uploads/contents/testi-no-image.png"
                  }
                >
                  <Info
                    variants={infoVars}
                    className="absolute bottom-0 w-full bg-black/60 p-3 opacity-0"
                  >
                    <div className="text-center text-lg text-white">
                      {tv.name}
                    </div>
                  </Info>
                </Box>
              ))}
        </Row>
        {router.asPath === `/nomflix/Tv/${type}/${tvId[0]}` ? (
          <div className="absolute ">
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed -top-10 z-10 h-[50rem] w-full bg-[rgba(0,0,0,0.5)] opacity-0 "
            >
              <Bigtv
                layoutId={tvId[0] + ""}
                className={cls(
                  "absolute left-0 right-0 mx-auto h-[85vh] w-[40vw] overflow-hidden rounded-lg bg-[#2F2F2F] shadow-xl outline-none "
                )}
                scrollY={0}
              >
                {clickedTv && (
                  <>
                    <BigCover
                      bgPhoto={
                        tvImg || tvPos !== null ? (
                          makeImagePath(tvImg || tvPos, "w500")
                        ) : (
                          <div className="bg-red-200">No image</div>
                        )
                      }
                      className="h-[350px] w-full rounded-t-xl bg-cover bg-[center_center] "
                    >
                      <BigTitle className="absolute top-[18rem] p-5 text-lg text-[#fff]">
                        {tvTitile}
                      </BigTitle>
                    </BigCover>
                    <div className="flex flex-col p-5 text-white ">
                      <div className="">
                        Realeased 🎥 :{" "}
                        {(clickedTvDetail?.first_air_date as string) +
                          " ~ " +
                          (new Date(clickedTvDetail?.last_air_date as string) >
                          new Date(
                            new Date().getTime() - 1000 * 60 * 60 * 24 * 7
                          )
                            ? ""
                            : clickedTvDetail?.last_air_date)}
                      </div>
                      <div>
                        {type === TypeShows.top_rated ||
                        (clickedTvDetail?.vote_average as number) === 0.0 ? (
                          <div>grade ⭐️ : No Data </div>
                        ) : (
                          <div>
                            grade ⭐️ :{" "}
                            {Math.floor(
                              Number(clickedTvDetail?.vote_average) * 100
                            ) / 100}
                          </div>
                        )}
                      </div>
                    </div>
                    <BigOverview className="inline-block flex-col px-5 text-[#fff]">
                      <span>🎬 </span>
                      {tvOverview ? (
                        <span>{tvOverview}</span>
                      ) : (
                        <span>It will update soon</span>
                      )}{" "}
                    </BigOverview>
                  </>
                )}
              </Bigtv>
            </Overlay>
          </div>
        ) : null}
      </AnimatePresence>
      <div>
        <motion.div
          variants={dirVars}
          initial="initial"
          whileHover={{ scale: 1.4 }}
          onClick={increaseIndex}
          className="relative float-right flex h-40 w-[2.6vw] items-center justify-center bg-transparent text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.div>
        <motion.div
          variants={dirVars}
          initial="initial"
          whileHover={{ scale: 1.4 }}
          onClick={decreaseIndex}
          className="relative float-left flex h-40 w-[2.6vw] items-center justify-center bg-transparent text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.div>
      </div>
    </Slider>
  );
}

const Overlay = styled(motion.div)``;
const Bigtv = styled(motion.div)<{ scrollY: number }>`
  top: ${(props) => props.scrollY + 100}px;
`;
const BigCover = styled(motion.div)<{ bgPhoto?: any }>`
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgPhoto});
`;
const BigTitle = styled(motion.div)``;
const BigOverview = styled(motion.div)``;
const Slider = styled.div``;
const Row = styled(motion.div)``;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
`;
const Info = styled(motion.div)``;

const rowVars = {
  hidden: (isBack: boolean) => ({
    x: isBack ? "-1440px" : "1440px",
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? "1440px" : "-1440px",
  }),
};
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
