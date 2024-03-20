import React from "react";
import { useState, useEffect } from "react";
import "../components/todo.css";
import img from "../assests/delete.png";
import Logo from "../assests/Logo.png";
import { useOnKeyPress } from "../components/useOnKeyPress";

const TodoFn = () => {
  const [value, setValue] = useState("");
  const [completed, setCompleted] = useState([]);
  const [Incompleted, setInCompleted] = useState([]);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("TodoValue");
    return savedData ? JSON.parse(savedData) : [];
  });

  const textfn = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      const id = Date.now();
      const newItem = { id, text: value };
      setData([...data, newItem]);
      setValue("");
    } else {
      alert("enter the values");
    }
  };

  const handleRemove = (id) => {
    const removeItems = data.filter((item) => item.id !== id);
    setData(removeItems);
  };

  const handleRadio = (id) => {

    const updateRadio = data.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setData(updateRadio);
    localStorage.setItem("TodoValue", JSON.stringify(updateRadio));
  };

  useEffect(() => {
  const unCompletedData = data.filter((item)=> !item.selected);
  setInCompleted(unCompletedData);
    const completedData = data.filter((item) => item.selected);
    setCompleted(completedData);
  }, [data]);



  useOnKeyPress(handleSubmit, "Enter");

  return (
    <div className="container">
      <img className="logo" src={Logo} alt="img" />
      <div className="entryArea flex">
        <div>
          <input
            type="text"
            onChange={textfn}
            value={value}
            onKeyDown={(e) => {
              if (e.key === "enter") {
                handleSubmit();
              }
            }}
            required
          />
          <div className="labelLine">What's need to be done?</div>
        </div>
        <div>
          <button className="addTask" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>
      <div className="showLists">
        <h2 className="listName1">Todo</h2>
        <ul>
          {Incompleted.map((item) => {
            return (
              <li key={item.id}>
                <div
                  className="lists-items"
                  onClick={() => handleRadio(item.id)}
                >
                  <input
                    type="checkbox"
                    id={`todo-${item.id}`}
                    name={`todo-${item.id}`}
                    value={item.text}
                    checked={item.selected}
                    onChange={() => handleRadio(item.id)}
                  />
                  <label htmlFor={`todo-${item.id}`} data-content={item.text}>
                    {item.text}
                  </label>
                </div>
                <div>
                  <img
                    className="Btn"
                    src={img}
                    alt="icon"
                    onClick={() => handleRemove(item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="completedLists">
        <h2 className="listName1">Completed</h2>
        <ul>
          {completed.map((item) => {
            return (
              <li key={item.id}>
                <div
                  className="lists-items"
                  onClick={() => handleRadio(item.id)}
                >
                  <input
                    type="checkbox"
                    id={`todo-${item.id}`}
                    name={`todo-${item.id}`}
                    value={item.text}
                    checked={item.selected}
                    onChange={() => handleRadio(item.id)}
                  />
                  <label htmlFor={`todo-${item.id}`} data-content={item.text}>
                    {item.text}
                  </label>
                </div>
                <div>
                  <img
                    className="Btn"
                    src={img}
                    alt="icon"
                    onClick={() => handleRemove(item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoFn;
