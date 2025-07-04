import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './dashboard';
import Songs from './songs/Songs';
import SongForm from './songs/SongForm';
import Users from './Users';
import Analytics from './Analytics';
import Settings from './settings';
import Albums from './Albums';
import Artists from './Artists';

// Error boundary component
const ErrorBoundary = ({ children, componentName }) => {
  try {
    return children;
  } catch (error) {
    console.error(`Error rendering ${componentName}:`, error);
    return (
      <div style={{ background: 'red', color: 'white', padding: '20px', margin: '20px' }}>
        ERROR RENDERING {componentName}: {error.message}
      </div>
    );
  }
};

const AdminRoutes = () => {
  console.log('AdminRoutes component is being called!');
  
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  console.log('AdminRoutes - currentUser:', currentUser);
  console.log('AdminRoutes - isAdmin:', isAdmin);
  console.log('AdminRoutes - Current location:', location.pathname);

  // If not logged in or not an admin, redirect to login
  if (!currentUser || !isAdmin) {
    console.log('AdminRoutes - Redirecting to login. currentUser:', !!currentUser, 'isAdmin:', isAdmin);
    return <Navigate to="/login" replace />;
  }

  console.log('AdminRoutes - About to render admin layout');

  return (
    <AdminLayout>
      <Routes>
        <Route index element={
          <ErrorBoundary componentName="Dashboard">
            <Dashboard />
          </ErrorBoundary>
        } />
        <Route path="songs" element={
          <ErrorBoundary componentName="Songs">
            <Songs />
          </ErrorBoundary>
        } />
        <Route path="songs/new" element={<SongForm />} />
        <Route path="songs/edit/:id" element={<SongForm />} />
        <Route path="albums" element={
          <ErrorBoundary componentName="Albums">
            <Albums />
          </ErrorBoundary>
        } />
        <Route path="artists" element={
          <ErrorBoundary componentName="Artists">
            <Artists />
          </ErrorBoundary>
        } />
        <Route path="users" element={
          <ErrorBoundary componentName="Users">
            <Users />
          </ErrorBoundary>
        } />
        <Route path="analytics" element={
          <ErrorBoundary componentName="Analytics">
            <Analytics />
          </ErrorBoundary>
        } />
        <Route path="settings" element={
          <ErrorBoundary componentName="Settings">
            <Settings />
          </ErrorBoundary>
        } />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
