import { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { TaskCard } from "../components/TaskCard.jsx";
import { TaskFilterSidebar } from "../components/TaskFilterSidebar.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { useFilteredTasks } from "../hooks/useFilteredTasks.js";

const PAGE_SIZE = 10;

export function TasksPage() {
  const tasks = useFilteredTasks();
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));

  // Changing filters can shrink the list past the stored page, so clamp on read
  // rather than correcting state in an effect (which would cascade a render).
  const currentPage = Math.min(page, pageCount);
  const visible = tasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Training" }, { label: "Tasks" }]} />
      <div className="page-with-sidebar">
        <div className="page-with-sidebar__main">
          <h1 className="page-title">Coding tasks</h1>

          {tasks.length === 0 ? (
            <div className="empty-state">
              Немає завдань, що відповідають фільтрам. Спробуй змінити критерії пошуку
              або додай нові завдання у <code className="inline-code">tasks.js</code>.
            </div>
          ) : (
            <>
              <div className="task-list">
                {visible.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
              <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
            </>
          )}
        </div>
        <TaskFilterSidebar />
      </div>
    </div>
  );
}
