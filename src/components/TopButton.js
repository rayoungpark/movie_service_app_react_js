import { useEffect, useState } from "react";

export default function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollevent = () => {
      if (3000 < window.scrollY) setShow(true);
      else setShow(false);
    };
    window.addEventListener("scroll", scrollevent);

    return () => window.removeEventListener("scroll", scrollevent);
  }, []);
  const goToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return show ? (
    <a href="/" onClick={goToTop} style={{ position: "fixed", right: "60px", bottom: "50px", fontSize: "2rem" }}>
      👆
    </a>
  ) : null;
}
