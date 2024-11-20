import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskModal from "./TaskModal";
import StrictModeDroppable from "./StrictModeDroppable";
import { initialColumns } from "../utils/jsonParser";

const TaskBoard = () => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("task-columns");
    return savedColumns ? JSON.parse(savedColumns) : initialColumns;
  });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("task-columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (newTask) => {
    const updatedColumns = { ...columns };

    if (!updatedColumns[newTask.status]) {
      updatedColumns[newTask.status] = [];
    }

    updatedColumns[newTask.status] = [
      ...updatedColumns[newTask.status],
      newTask,
    ];

    setColumns(updatedColumns);
    setModalOpen(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedColumns = { ...columns };

    if (source.droppableId !== destination.droppableId) {
      const sourceItems = [...updatedColumns[source.droppableId]];
      const destItems = [...updatedColumns[destination.droppableId]];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      updatedColumns[source.droppableId] = sourceItems;
      updatedColumns[destination.droppableId] = destItems;
    } else {
      const columnItems = [...updatedColumns[source.droppableId]];
      const [removed] = columnItems.splice(source.index, 1);
      columnItems.splice(destination.index, 0, removed);

      updatedColumns[source.droppableId] = columnItems;
    }

    setColumns(updatedColumns);
  };

  return (
    <div>
      <button
        style={{
          margin: "16px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => setModalOpen(true)}
      >
        Add New Task
      </button>
      <button
        style={{
          margin: "16px",
          padding: "8px 16px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.removeItem("task-columns");
          setColumns(initialColumns);
        }}
      >
        Reset Tasks
      </button>
      {isModalOpen && (
        <TaskModal
          columns={columns}
          onClose={() => setModalOpen(false)}
          onSubmit={addTask}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "16px",
          }}
        >
          {Object.entries(columns).map(([columnId, tasks]) => (
            <StrictModeDroppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: "30%",
                    minHeight: "400px",
                    border: snapshot.isDraggingOver
                      ? "2px dashed #007bff"
                      : "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "16px",
                    margin: "8px",
                    backgroundColor: snapshot.isDraggingOver
                      ? "#e7f3ff"
                      : "#f9f9f9",
                    boxShadow: snapshot.isDraggingOver
                      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                      : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.2s ease, border 0.2s ease",
                  }}
                >
                  <h2 style={{ textAlign: "center", color: "#007bff" }}>
                    {columnId}
                  </h2>
                  <Column tasks={tasks} />
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
