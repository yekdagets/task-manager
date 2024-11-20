import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const Column = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                padding: "16px",
                marginBottom: "8px",
                borderRadius: "4px",
                border: snapshot.isDragging
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
                backgroundColor: snapshot.isDragging ? "#e7f3ff" : "white",
                transition: "background-color 0.2s ease, border 0.2s ease",
                boxShadow: snapshot.isDragging
                  ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                  : "none",
                ...provided.draggableProps.style,
              }}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default Column;
