import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StaffDashboard from './pages/StaffDashboard'
import Complaints from './pages/Complaints'
import ComplaintDetail from './pages/ComplaintDetail'
import NewComplaint from './pages/NewComplaint'

const AppRoutes = () => {
  const { user } = useAuth()
  
  return (
    <Routes>
      {/* For now, redirect auth routes straight to the dashboard */}
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      <Route path="/register" element={<Navigate to="/dashboard" replace />} />

      <Route path="/" element={<Layout />}>
        <Route index element={user?.role === 'admin' || user?.role === 'staff' ? <Navigate to="/staff" replace /> : <Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="complaints/new" element={<NewComplaint />} />
        <Route path="complaints/:id" element={<ComplaintDetail />} />
        <Route path="staff" element={<StaffDashboard />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router basename="/bro-code">
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
