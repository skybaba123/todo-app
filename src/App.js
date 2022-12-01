import "./App.scss";
import bgLight from "./images/bg-desktop-light.jpg";
import bgDark from "./images/bg-desktop-dark.jpg";
import iconMoon from "./images/icon-moon.svg";
import iconSun from "./images/icon-sun.svg";
import check from "./images/icon-check.svg";
import Todo from "./Todo";
import { useState } from "react";
import { useLayoutEffect } from "react";
import "animate.css";

const App = () => {
  const [todoList, setTodoList] = useState([
    {
      id: 10 + Math.random() * 100,
      content: "Complete online Javascript course",
    },
    {
      id: 10 + Math.random() * 100,
      content: "Jog around the park 3x",
    },
    {
      id: 10 + Math.random() * 100,
      content: "10 minutes meditation",
    },
    {
      id: 10 + Math.random() * 100,
      content: "Read for 1 hour",
    },
    {
      id: 10 + Math.random() * 100,
      content: "Pick Up groceries",
    },
    {
      id: 10 + Math.random() * 100,
      content: "Complete Todo App on Frontend Mentor",
    },
  ]);

  const [todoInput, setTodoInput] = useState("");
  const [ids, setIds] = useState([]);
  const [allTodo, setAllTodo] = useState(todoList);
  const [items, setItems] = useState(allTodo.length);
  const [fadin, setFadein] = useState("fadeIn");
  const [toggle, setToggle] = useState(false);

  const completedTodo = todoList.filter((todo) => ids.includes(todo.id));

  const activeTodo = todoList.filter((todo) => ids.includes(todo.id) === false);
  useLayoutEffect(() => {
    setItems(activeTodo.length);
    setAllTodo(todoList);
    setIds(ids);
  }, [activeTodo.length, todoList, ids]);

  const conpletedId = (id) => {
    if (ids.includes(id)) return;
    setIds((prev) => [...prev, id]);
  };

  const removeId = (activeId) => {
    setIds((prev) => prev.filter((id) => id !== activeId));
  };

  const deleteItem = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addTodo = () => {
    const newTodo = {
      id: 10 + Math.random() * 100,
      content: todoInput,
    };

    if (todoInput.trim().length === 0) return;
    setTodoList((prev) => [newTodo, ...prev]);
    setTodoInput("");
  };

  const completeAll = () => {
    if (ids.length === todoList.length) {
      setIds([]);
    } else {
      setIds(() => todoList.map((todo) => todo.id));
    }
    setFadein("bounce");
    setTimeout(() => {
      setFadein("");
    }, [500]);
  };

  const checked = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background:
      ids.length === todoList.length &&
      "linear-gradient( hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
    border: "1px solid rgb(221, 221, 221)",
  };

  return (
    <div
      style={{
        backgroundColor: toggle ? "hsl(235, 21%, 11%)" : "",
        color: toggle ? "white" : "",
      }}
      className="App"
    >
      <img className="bg-img" src={toggle ? bgDark : bgLight} alt="bgLight" />
      <div className="container">
        <div className="title-container">
          <h1>TODO</h1>
          <img
            onClick={() => setToggle(!toggle)}
            src={toggle ? iconSun : iconMoon}
            alt="icon-sun"
          />
        </div>

        <div
          style={{ backgroundColor: toggle ? "hsl(235, 24%, 19%)" : "" }}
          className="input-container"
        >
          <section>
            <div onClick={completeAll} className="check" style={checked}>
              {ids.length === todoList.length && (
                <img src={check} alt="check" />
              )}
            </div>

            <input
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              type="text"
              placeholder="Add todo"
              style={{
                backgroundColor: toggle ? "hsl(235, 24%, 19%)" : "",
                color: toggle ? "white" : "",
              }}
            />
          </section>

          <button onClick={addTodo}>Add New</button>
        </div>

        <div
          style={{ backgroundColor: toggle ? "hsl(235, 24%, 19%)" : "" }}
          className="todo-container"
        >
          <div className="todo-Wrapper">
            {allTodo.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                conpletedId={conpletedId}
                content={todo.content}
                todo={todo}
                ids={ids}
                removeId={removeId}
                fadein={fadin}
                deleteItem={deleteItem}
              />
            ))}
          </div>

          <div className="bottom-tab">
            <p>{items} items left</p>
            <div>
              <p
                className="tab-link"
                onClick={() => {
                  setAllTodo(todoList);
                  setFadein("zoomIn");
                  setTimeout(() => {
                    setFadein("");
                  }, 500);
                }}
              >
                All
              </p>
              <p
                className="tab-link"
                onClick={() => {
                  setAllTodo(activeTodo);
                  setFadein("zoomIn");
                  setTimeout(() => {
                    setFadein("");
                  }, 500);
                }}
              >
                Active
              </p>
              <p
                className="tab-link"
                onClick={() => {
                  setAllTodo(completedTodo);
                  setFadein("zoomIn");
                  setTimeout(() => {
                    setFadein("");
                  }, 500);
                }}
              >
                Completed
              </p>
            </div>
            <p onClick={() => setIds([])}>Clear Completed</p>
          </div>
        </div>

        <div
          style={{ backgroundColor: toggle ? "hsl(235, 24%, 19%)" : "" }}
          className="mobile-bottom-tab"
        >
          <p
            className="tab-link"
            onClick={() => {
              setAllTodo(todoList);
              setFadein("zoomIn");
              setTimeout(() => {
                setFadein("");
              }, 500);
            }}
          >
            All
          </p>
          <p
            className="tab-link"
            onClick={() => {
              setAllTodo(activeTodo);
              setFadein("zoomIn");
              setTimeout(() => {
                setFadein("");
              }, 500);
            }}
          >
            Active
          </p>
          <p
            className="tab-link"
            onClick={() => {
              setAllTodo(completedTodo);
              setFadein("zoomIn");
              setTimeout(() => {
                setFadein("");
              }, 500);
            }}
          >
            Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
