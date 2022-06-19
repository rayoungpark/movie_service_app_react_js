import { useRef, useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const toDoListRef = useRef();
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => e.preventDefault();
  const onClick = () => {
    const value = toDo.trimStart();
    if (value === "") return;
    setToDos((curArr) => [toDo, ...curArr]);
    setToDo("");
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} type="text" placeholder="Write your todo ..." />
        <button onClick={onClick}>Add To Do</button>
      </form>
      <hr />
      <ul
        ref={toDoListRef}
        onClick={(e) => {
          if (e.target.nodeName === "LI") {
            const idx = [...toDoListRef.current.childNodes].findIndex((v) => v === e.target);
            const arr = [...toDos];
            arr.splice(idx, 1);
            setToDos(arr);
          }
        }}
      >
        {toDos.map((value, i) => (
          <li key={i}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
