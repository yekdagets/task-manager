import tasks from "../data/tasks.json";

export function parseTasks(json) {
  const columns = {};
  json.forEach((task, index) => {
    const taskWithId = {
      ...task,
      id: `${task.title.replace(/\s+/g, "-")}-${index}`,
    };

    if (!columns[taskWithId.status]) {
      columns[taskWithId.status] = [];
    }
    columns[taskWithId.status].push(taskWithId);
  });
  return columns;
}

export const initialColumns = parseTasks(tasks);
