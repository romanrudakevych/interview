import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QuestionsProvider } from "./context/QuestionsContext.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { QuestionListPage } from "./pages/QuestionListPage.jsx";
import { QuestionDetailsPage } from "./pages/QuestionDetailsPage.jsx";
import { AnalyticsPage } from "./pages/AnalyticsPage.jsx";
import { InterviewPage } from "./pages/InterviewPage.jsx";
import { TasksPage } from "./pages/TasksPage.jsx";
import { ResourcesPage } from "./pages/ResourcesPage.jsx";
import { CollectionsPage } from "./pages/CollectionsPage.jsx";

export default function App() {
  return (
    <QuestionsProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/training/interview" element={<InterviewPage />} />
              <Route path="/training/tasks" element={<TasksPage />} />
              <Route path="/knowledge-base/resources" element={<ResourcesPage />} />
              <Route path="/knowledge-base/questions" element={<QuestionListPage />} />
              <Route path="/knowledge-base/questions/:id" element={<QuestionDetailsPage />} />
              <Route path="/knowledge-base/collections" element={<CollectionsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QuestionsProvider>
  );
}
