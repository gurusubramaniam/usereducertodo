import { useReducer, useState } from "react";

const ACTIONS = {
  ADD_TO_DO: "addtodo",
  DELETE_TO_DO: "deletetodo",
  COMPLETED_TO_DO: "completedtodo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_DO:
      return [...todos, newTodo(action.payload.desc, action.payload.time)];
    case ACTIONS.COMPLETED_TO_DO:
      return todos.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, complete: !item.complete };
        }
        return item;
      });
    case ACTIONS.DELETE_TO_DO:
      return todos.filter((item) => item.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(desc, time) {
  return { id: Date.now(), desc: desc, complete: false, time: time };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [desc, setDesc] = useState();
  const [time, setTime] = useState();

  function handleSubmit() {
    dispatch({ type: ACTIONS.ADD_TO_DO, payload: { desc: desc, time: time } });
    setDesc(" ");
    setTime(" ");
  }

  return (
    <div className="App">
      <p>
        <input
          type="text"
          name="desc"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="text"
          name="time"
          placeholder="mm/dd/yy HH:MM"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
      </p>
      <p>
        <button onClick={handleSubmit}>Add todo</button>
      </p>
      <ul>
        {todos.map((item, index) => {
          return (
            <li>
              <span
                style={{ color: item.complete ? "green" : "red" }}
                key={index}
              >
                {item.desc}
              </span>
              <button
                onClick={() => {
                  dispatch({
                    type: ACTIONS.DELETE_TO_DO,
                    payload: { id: item.id },
                  });
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: ACTIONS.COMPLETED_TO_DO,
                    payload: { id: item.id },
                  });
                }}
              >
                Complete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
