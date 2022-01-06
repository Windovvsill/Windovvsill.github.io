import { useState, useEffect } from "react";
import { isBrowser } from "../utils/browser";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = isBrowser() ? window : {innerHeight:0, innerWidth:0};
  return {
    width,
    height
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    isBrowser() && window.addEventListener("resize", handleResize);
    return () => isBrowser() && window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
