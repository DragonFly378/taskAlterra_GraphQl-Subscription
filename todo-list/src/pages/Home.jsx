import Button from "../components/Button";
import Tasks from "../components/Tasks";
// import SideNavbar from "../components/SideNavbar";

import { useState, useEffect } from "react";
import { useSubscription, useMutation } from "@apollo/client";

import {
  GetLists,
  InsertList,
  DeleteList,
  UpdateCompleted,
  UpdateTask,
} from "../GraphQl/queries";

const Home = () => {
  const { data, loading, error } = useSubscription(GetLists);

  // const [getData, { data, loading: loadingLazy, error: errorLazy, refetch }] =
  //   useLazyQuery(GetLists); // if you want use LazyQuery

  const [insertTodo, { loading: loadingInsert }] = useMutation(InsertList, {
    onCompleted: (data) => {},
    onError: (error) => {
      console.log("error nih gan", { error });
    },
  });

  const [deleteTodo, { loading: loadingDelete }] = useMutation(DeleteList, {
    onCompleted: (data) => {},
    onError: (error) => {
      console.log("error nih gan", { error });
    },
  });

  const [updateCompleted, { loading: loadingUpdate }] = useMutation(
    UpdateCompleted,
    {
      onCompleted: (data) => {},
      onError: (error) => {
        console.log("error nih gan", { error });
      },
    }
  );

  const [updateTask, { loading: loadingUpdate2 }] = useMutation(UpdateTask, {
    onCompleted: (data) => {},
    onError: (error) => {
      console.log("error nih gan", { error });
    },
  });

  const [title, setTitle] = useState("");

  const [complete, setComplete] = useState(false);

  const [tmp, setTmp] = useState(false);

  const [id, setId] = useState(false);

  const [isUpdateTask, setIsUpdateTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Membuat Komponen",
      completed: false,
    },
    {
      id: 2,
      title: "Unit Testing",
      completed: false,
    },
    {
      id: 3,
      title: "Setup Development Environment",
      completed: false,
    },
    {
      id: 4,
      title: "Deploy ke server",
      completed: false,
    },
  ]);

  // console.log(tasks);

  /* jika task nya selesai, maka nilai dari akan disimpan 
  kedalam variabel obj.complete, lalu dikembalikan lagi ke setTmp */
  // const checkCompleted = (obj, tmp, setTmp) => {
  //   if (tmp) {
  //     obj.completed = false;
  //     setTmp(obj.completed);
  //   } else {
  //     obj.completed = true;
  //     setTmp(obj.completed);
  //   }
  // };

  /* Update Completed Task */
  const checkCompleted = (id) => {
    const item = data?.todolist.find((x) => x.id === id);
    console.log(data?.todolist);
    updateCompleted({
      variables: {
        id: id,
        completed: !item.completed,
      },
    });
  };

  const onUpdateTask = (NewTitle, id, e) => {
    e.preventDefault();
    console.log(NewTitle, id);
    updateTask({
      variables: {
        id: id,
        title: NewTitle,
      },
    });
    setIsUpdateTask(!isUpdateTask);
    setTitle("");
  };

  /* Delete Task */
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteTodo({
      variables: {
        id: id,
      },
    });
    setTitle("");
  };

  /* Add task */
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);

    /* GraphQl */
    const tmp = {
      id: id,
      title: title,
      completed: false,
      user_id: 1,
    };
    insertTodo({
      variables: {
        object: tmp,
      },
    });
  };

  const onUpdateClick = (title, id) => {
    setIsUpdateTask(!isUpdateTask);
    setTitle(title);
    setId(id);
    // console.log(isUpdateTask);
  };
  // console.log(isUpdateTask);

  /* ketika disubmit, data akan dikirim ke addTask */
  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Tambahkan Task Gan!");
      return;
    }

    addTask({
      title,
      complete,
    });

    setTitle("");
    setComplete("");
  };

  useEffect(() => {
    console.log(data);
    // console.log(data.todolist.length);
  }, [data]);

  return (
    <>
      <div className="home-section">
        <div className="container">
          <div className="header">
            <div className="judul">Todos</div>{" "}
            <p>
              Tambahkan list <br />{" "}
              <span> Kebutuhan/Tugas/Belanjaan/Dosa/Pahala</span> <br /> Anda
              dimari...
            </p>
          </div>

          <div className="konten">
            {isUpdateTask == false ? (
              <form className="addtask" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Add todo..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    // console.log(title);
                  }}
                />
                <Button text={"Add Task"} color={"black"} type="submit" />
              </form>
            ) : (
              <form
                className="addtask"
                onSubmit={(e) => {
                  onUpdateTask(title, id, e);
                }}
              >
                <input
                  type="text"
                  placeholder="Update Data"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    // console.log(title);
                  }}
                />
                <Button
                  text={"Update Task"}
                  color={"rgb(29, 2, 122)"}
                  type="submit"
                />
              </form>
            )}

            <div className="showtask">
              {data?.todolist.map((task, index) => {
                return (
                  <Tasks
                    key={index}
                    // checkCompleted={() => checkCompleted(task, tmp, setTmp)}
                    checkCompleted={() => checkCompleted(task.id)}
                    classTitle={`task-title ${
                      task.completed ? "completed" : ""
                    }`}
                    title={task.title}
                    completed={task.completed}
                    onDelete={() => deleteTask(task.id)}
                    onUpdate={() => onUpdateClick(task.title, task.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
