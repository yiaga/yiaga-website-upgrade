import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Governance from "./pages/Governance";
import Democracy from "./pages/Democracy";
import Initiatives from "./pages/Initiatives";
import InitiativeDetail from "./pages/InitiativeDetail";
import Resources from "./pages/Resources";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Programmes from "./pages/Programmes";
import NotFound from "./pages/NotFound";

// Admin pages
import Login from "./pages/admin/Login";
import Signup from "./pages/admin/Signup";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import BlogManagement from "./pages/admin/BlogManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import CommentsManagement from "./pages/admin/CommentsManagement";
import UserManagement from "./pages/admin/UserManagement";
import AuditLogs from "./pages/admin/AuditLogs";
import CareersManagement from "./pages/admin/CareersManagement";
import ResourcesManagement from "./pages/admin/ResourcesManagement";
import AnnouncementsManagement from "./pages/admin/AnnouncementsManagement";
import InitiativesManagement from "./pages/admin/InitiativesManagement";
import SubscriberManagement from "./pages/admin/SubscriberManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/democracy" element={<Democracy />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programmes" element={<Programmes />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="blogs" element={<ProtectedRoute requiredRoles={['technical', 'admin']}><BlogManagement /></ProtectedRoute>} />
              <Route path="news" element={<ProtectedRoute requiredRoles={['technical', 'admin']}><NewsManagement /></ProtectedRoute>} />
              <Route path="content" element={<ProtectedRoute requiredRoles={['technical', 'admin']}><ContentManagement /></ProtectedRoute>} />
              <Route path="resources" element={<ProtectedRoute requiredRoles={['technical', 'admin']}><ResourcesManagement /></ProtectedRoute>} />
              <Route path="announcements" element={<ProtectedRoute requiredRoles={['technical', 'admin']}><AnnouncementsManagement /></ProtectedRoute>} />
              <Route path="initiatives" element={<ProtectedRoute requiredRoles={['technical', 'admin']}><InitiativesManagement /></ProtectedRoute>} />
              <Route path="comments" element={<CommentsManagement />} />
              <Route path="users" element={<ProtectedRoute requiredRoles={['admin']}><UserManagement /></ProtectedRoute>} />
              <Route path="subscribers" element={<ProtectedRoute requiredRoles={['admin', 'technical']}><SubscriberManagement /></ProtectedRoute>} />
              <Route path="careers" element={<ProtectedRoute requiredRoles={['admin']}><CareersManagement /></ProtectedRoute>} />
              <Route path="audit" element={<ProtectedRoute requiredRoles={['admin']}><AuditLogs /></ProtectedRoute>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
