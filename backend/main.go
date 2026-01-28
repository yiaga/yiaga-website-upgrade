package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Announcement struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Link        string `json:"link"`
	Image       string `json:"image"`
}

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("yiaga.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Auto migrate models
	db.AutoMigrate(&Announcement{})

	// Seed initial data if database is empty
	seedData()

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
		r.Get("/announcements", getAnnouncements)
		r.Post("/announcements", createAnnouncement)
		r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("ok"))
		})
	})

	log.Println("Yiaga Backend Server starting on :8081")
	if err := http.ListenAndServe(":8081", r); err != nil {
		log.Fatal(err)
	}
}

func seedData() {
	var count int64
	db.Model(&Announcement{}).Count(&count)
	if count == 0 {
		announcements := []Announcement{
			{
				Title:       "NVIS (National Voting Intentions Survey) Report 1 is released",
				Description: "Our comprehensive survey on national voting intentions is now available. Gain insights into the current political landscape and voter sentiment across the country.",
				Date:        "January 28, 2026",
				Link:        "#",
				Image:       "/src/assets/nvis-report.jpg",
			},
			{
				Title:       "Youth Civic Engagement Summit 2025",
				Description: "Join us for our annual summit bringing together young leaders from across Africa to discuss civic participation, democratic governance, and community development.",
				Date:        "January 15, 2025",
				Link:        "#",
				Image:       "/src/assets/discuss.jpg",
			},
			{
				Title:       "Yiaga Africa have acquired ED Certified by NGOsource",
				Description: "We are pleased to announce that Yiaga Africa has achieved Equivalency Determination (ED) certification, further validating our commitment to transparency and global standards.",
				Date:        "November 28, 2024",
				Link:        "#",
				Image:       "/src/assets/ngosource-ed.jpg",
			},
		}
		for _, a := range announcements {
			db.Create(&a)
		}
		log.Println("Database seeded with initial announcements")
	}
}

func getAnnouncements(w http.ResponseWriter, r *http.Request) {
	var announcements []Announcement
	db.Find(&announcements)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(announcements)
}

func createAnnouncement(w http.ResponseWriter, r *http.Request) {
	var announcement Announcement
	if err := json.NewDecoder(r.Body).Decode(&announcement); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db.Create(&announcement)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(announcement)
}
