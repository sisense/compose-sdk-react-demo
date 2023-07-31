import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const location = useLocation();

  const hashElement = useMemo(() => {
    const hash = location.hash;
    console.log(hash)
    if (hash) {
      console.log(hash);
      const element = document.querySelector(hash);
      console.log(element);
      return element;
    } else {
      return null;
    }
  }, [location.hash]);

  useEffect(() => {
    const scrollToElement = () => {
      if (hashElement) {
        hashElement.scrollIntoView({
          behavior: "smooth",
          inline: "nearest",
        });
      }
    };
    if (hashElement) {
      scrollToElement();
    }
  }, [hashElement]);

  return null;
};

export default ScrollToHashElement;
