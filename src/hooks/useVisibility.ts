import { createRef, useEffect, useState } from "react";
import throttle from "lodash.throttle";

export default function useVisibility<Element extends HTMLElement>(
  offset = 0,
  throttleMilliseconds = 100
): [Boolean, React.RefObject<Element>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = createRef<Element>();

  const onScroll = throttle(() => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const top = currentElement.current.getBoundingClientRect().top;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  }, throttleMilliseconds);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return [isVisible, currentElement];
}
