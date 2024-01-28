import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "i wan to learn react such that i can treat it like my slave and make it do whatever i want to do.",
    tags: ["web", "react", "js"],

    priority: "High",

    isFavourite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);

  // add tas modal

  const [showAddModal, setShowAddModal] = useState(false);

  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask: any, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
      setShowAddModal(false);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    console.log("handle edit task", task);
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    // setTaskToUpdate(null);
  };
  const handleTaskDelete = (taskId) => {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  };
  const handleDeleteAll = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFav = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    setTasks(newTasks);
  };

  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
    const filterd = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filterd]);
  };

  return (
    <div>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddEditTask}
            taskToUpdate={taskToUpdate}
            onCloseClick={handleCloseModal}
          />
        )}

        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <SearchTask onSearch={handleSearch} />
            <TaskActions
              onDelteClick={handleDeleteAll}
              onAddClick={() => setShowAddModal(true)}
            />
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleTaskDelete}
              onFav={handleFav}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskBoard;
