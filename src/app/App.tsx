import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LettersProvider } from "@/entities/letter/model/context/LettersContext";
import { DashboardPage } from "@/pages/dashboard/ui/DashboardPage";
import { GeneratorPage } from "@/pages/generator/ui/GeneratorPage";
import { APP_ROUTES } from "@/shared/config/constants";

export default function App() {
  return (
    <LettersProvider>
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={APP_ROUTES.create} element={<GeneratorPage />} />
          <Route path={APP_ROUTES.letter} element={<GeneratorPage />} />
          <Route path="*" element={<Navigate to={APP_ROUTES.dashboard} replace />} />
        </Routes>
      </BrowserRouter>
    </LettersProvider>
  );
}
