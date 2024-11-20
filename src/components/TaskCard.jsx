import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>
        <strong>Assignee:</strong> {task.assignee}
      </p>
    </div>
  );
};

export default TaskCard;
