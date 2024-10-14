import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/HomePage";
import Services from "./pages/Service/Services";
import Incidents from "./pages/Incident/Incidents";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ServiceDetailPage from "./pages/Service/ServiceDetails";
import PublicStatusPage from "./pages/PublicStatus";
import TeamDetails from "./pages/Team/TeamDetails";
import CreateTeamPage from "./pages/Team/CreateTeam";
import IncidentDetailsPage from "./pages/Incident/IncidentDetails";
import OrganizationDetailsPage from "./pages/Organisation/OrganizationDetailsPage";
import { AcceptInvitation } from "./pages/Organisation/AcceptInvitation";
import Maintenances from "./pages/Maintenance/Maintenances";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/organizations/:orgId"
            element={
              <PrivateRoute>
                <Layout>
                  <OrganizationDetailsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path=":orgId/services"
            element={
              <PrivateRoute>
                <Layout>
                  <Services />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/:orgId/services/:serviceId"
            element={
              <PrivateRoute>
                <Layout>
                  <ServiceDetailPage></ServiceDetailPage>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path=":orgId/incidents"
            element={
              <PrivateRoute>
                <Layout>
                  <Incidents />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path=":orgId/maintenances"
            element={
              <PrivateRoute>
                <Layout>
                  <Maintenances />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/:orgId/services/:serviceId/incidents/:incidentId"
            element={
              <PrivateRoute>
                <Layout>
                  <IncidentDetailsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path=":orgId/incidents/:incidentId"
            element={
              <PrivateRoute>
                <Layout>
                  <IncidentDetailsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/organizations/:organizationId/teams/:teamId"
            element={
              <PrivateRoute>
                <Layout>
                  <TeamDetails />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/organizations/:organizationId/teams/new"
            element={
              <PrivateRoute>
                <Layout>
                  <CreateTeamPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/invitations/:invitationId/accept"
            element={
              <PrivateRoute>
                <Layout>
                  <AcceptInvitation />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="/public-status/:orgId" element={<PublicStatusPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
