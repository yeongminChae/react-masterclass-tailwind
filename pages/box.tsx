import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const box = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    rotateX: 180,
    transition: {
      duration: 0.3,
    },
  }),
};

const Home: NextPage = () => {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState<boolean>(false);
  const nextPls = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPls = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const customValue = {
    direction: back,
  };
  return (
    <motion.div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <AnimatePresence mode="wait" custom={customValue.direction}>
        <motion.div
          key={visible}
          custom={customValue.direction}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          className="absolute flex h-40 w-64 items-center justify-center rounded-[40px] bg-white text-2xl shadow-xl"
        >
          {visible}
        </motion.div>
      </AnimatePresence>
      <button className="absolute bottom-52" onClick={nextPls}>
        Next
      </button>
      <button className="absolute bottom-44" onClick={prevPls}>
        Prev
      </button>
    </motion.div>
  );
};

export async function getStaticProps() {
  console.log("BUILDING COMM. STATICALLY");
  // const posts = await client.post.findMany({ include: { user: true } });
  return {
    props: {
      // posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default Home;
