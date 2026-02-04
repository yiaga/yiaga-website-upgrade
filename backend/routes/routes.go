package routes

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"yiaga-backend/handlers"
	authMiddleware "yiaga-backend/middleware"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS configuration
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // Be more permissive for development
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// API Routes
	r.Route("/api", func(r chi.Router) {
		// Announcements
		r.Get("/announcements", handlers.GetAnnouncements)
		r.Post("/announcements", handlers.CreateAnnouncement)

		// Blogs & News
		r.Get("/blogs", handlers.GetBlogs)
		r.Get("/blogs/{slug}", handlers.GetBlogBySlug)

		// Initiatives
		r.Get("/initiatives", handlers.GetInitiatives)
		r.Get("/initiatives/{slug}", handlers.GetInitiativeBySlug)

		// Resources
		r.Get("/resources", handlers.GetResources)

		// Jobs
		r.Get("/jobs", handlers.GetJobs)
		r.Post("/jobs", handlers.CreateJob)
		r.Put("/jobs/{id}", handlers.UpdateJob)
		r.Delete("/jobs/{id}", handlers.DeleteJob)

		// Forms
		// Public Routes
		r.Post("/contact", handlers.SubmitContact)
		r.Post("/subscribe", handlers.SubscribeNewsletter)
		r.Post("/login", handlers.Login)
		r.Post("/signup", handlers.Signup)
		r.Get("/comments", handlers.GetComments) // Public for specific posts (approved), Protected for list

		// --- Protected Admin Routes ---
		r.Group(func(r chi.Router) {
			r.Use(authMiddleware.AuthMiddleware)

			r.Get("/dashboard/stats", handlers.GetDashboardStats)
			r.Get("/subscribers/analytics", handlers.GetSubscriberAnalytics)
			r.Post("/upload", handlers.HandleFileUpload)

			// CMS - Hero
			r.Get("/content/hero/{page}", handlers.GetHeroContent)
			r.Post("/content/hero", handlers.UpdateHeroContent)

			// CMS - Blog/News Management
			r.Post("/blogs", handlers.CreateBlogPost)
			r.Put("/blogs/{id}", handlers.UpdateBlogPost)
			r.Delete("/blogs/{id}", handlers.DeleteBlogPost)

			// CMS - Resources Management
			r.Post("/resources", handlers.CreateResource)
			r.Delete("/resources/{id}", handlers.DeleteResource)

			// CMS - Announcements Management
			r.Delete("/announcements/{id}", handlers.DeleteAnnouncement)

			// CMS - Initiatives Management
			r.Post("/initiatives", handlers.CreateInitiative)
			r.Put("/initiatives/{id}", handlers.UpdateInitiative)
			r.Delete("/initiatives/{id}", handlers.DeleteInitiative)

			// CMS - Partners
			r.Get("/partners", handlers.GetPartners) // Admin might be the only one listing partners fully? Or public?
		})

		// Protected Mutations group
		r.Group(func(r chi.Router) {
			r.Use(authMiddleware.AuthMiddleware)

			// Partners Mutations
			r.Post("/partners", handlers.CreatePartner)
			r.Delete("/partners/{id}", handlers.DeletePartner)

			// Comments Admin
			r.Put("/comments/{id}/status", handlers.UpdateCommentStatus)
			r.Delete("/comments/{id}", handlers.DeleteComment)

			// Users
			r.Get("/users", handlers.GetUsers)
			r.Post("/users", handlers.CreateUser)
			r.Put("/users/{id}", handlers.UpdateUser)
			r.Delete("/users/{id}", handlers.DeleteUser)

			// Audit Logs
			r.Get("/audit-logs", handlers.GetAuditLogs)
			r.Post("/audit-logs", handlers.CreateAuditLog) // Technically system calls this, but fine for now

			// Badges Mutations
			r.Post("/badges", handlers.CreateBadge)
			r.Delete("/badges/{id}", handlers.DeleteBadge)
		})

		// Public GETs for shared resources that might be used on frontend
		r.Get("/partners", handlers.GetPartners)
		r.Get("/badges", handlers.GetBadges)

		r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("ok"))
		})
	})

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// This ensures the root path returns a 200 OK instead of a 404
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"status": "success", "message": "Yiaga Backend API is running"}`)
	})

	return r
}
