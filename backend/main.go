package main

import (
	"log"
	"net/http"
	"os"

	"yiaga-backend/database"
	"yiaga-backend/routes"
	"yiaga-backend/seeds"
)

func main() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=yiaga password=yiagaPassword dbname=yiagadb port=5432 sslmode=disable TimeZone=Africa/Lagos"
		log.Println("Using default database connection string. Set DATABASE_URL environment variable to override.")
	}

	// 1. Initialize DB with retries (Update your database.Init to handle this)
	database.Init(dsn)

	// 2. Seed data (Consider doing this asynchronously if it's large)
	go seeds.SeedData()

	r := routes.SetupRouter()

	// 3. Add a simple health check route in your routes/setup
	// r.GET("/health", func(c *gin.Context) { c.Status(200) })

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Yiaga Backend Server starting on :%s", port)

	// Cloud Run needs this to happen ASAP
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
