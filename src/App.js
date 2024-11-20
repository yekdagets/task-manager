import React from "react";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
