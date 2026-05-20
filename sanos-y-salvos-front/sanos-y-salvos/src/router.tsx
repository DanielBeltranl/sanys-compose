import { Route, Routes } from 'react-router';
import { MainLayout } from './context/commons/layouts/MainLayout';
import { PrivateRoute } from './context/commons/guards/PrivateRoute';
import { RolSelectorView } from './context/rolSelectionPage/rolSelectorView.tsx';
import { RegisterView } from './context/registerPage/view/registerView.tsx';
import { DashboardView } from './context/dashboardPage/view/dashboardView.tsx';
import { CrearReporteView } from './context/crearReportePage/view/crearReporteView.tsx';
import { ReporteDetailView } from './context/reporteDetailPage/view/reporteDetailView.tsx';
import { LoginView } from './context/loginPage/view/loginView.tsx';
import { UnauthorizedView } from './context/unauthorizedPage/view/UnauthorizedView';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<LoginView />} />
      <Route element={<MainLayout />}>
        <Route path="/rol-selector" element={<RolSelectorView />} />
        <Route path="/register/:userType" element={<RegisterView />} />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedView />} />
      {/* Protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/crear-reporte" element={<CrearReporteView />} />
        <Route path="/reportes/:id" element={<ReporteDetailView />} />
      </Route>
    </Routes>
  );
};
