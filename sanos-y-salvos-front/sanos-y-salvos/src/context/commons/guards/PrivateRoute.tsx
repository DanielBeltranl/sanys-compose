import { Navigate, Outlet } from 'react-router'
import { tokenManager } from '../../../services/tokenManager'

export function PrivateRoute() {
  return tokenManager.isValid() ? <Outlet /> : <Navigate to="/unauthorized" replace />
}
