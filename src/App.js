import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function TestNode() {
  useEffect(() => {
    console.log("create :)");
    return () => {
      // component가 사라질 때 실행됨
      console.log("destroyed :<");
    };
  }, []);

  return <h1>TEST</h1>;
}
function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);

  // const hanldeClick = () => setCounter((cur) => cur + 1);
  const hanldeClick = () => setShow((cur) => !cur);
  const hanldeInput = (e) => setKeyword(e.target.value);

  useEffect(() => console.log("only one"), []);
  useEffect(() => {
    if (keyword && keyword.length > 5) console.log(keyword);
  }, [keyword]);

  return (
    <div>
      {show && <TestNode />}
      <input type={"text"} placeholder="Search here..." value={keyword} onChange={hanldeInput} />
      <p>{counter}</p>
      <Button onClick={hanldeClick} text={"Button"} />
    </div>
  );
}

export default App;
