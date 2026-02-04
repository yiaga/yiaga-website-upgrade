package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

// --- Dashboard ---

func GetDashboardStats(w http.ResponseWriter, r *http.Request) {
	var userCount, blogCount, newsCount, subscriberCount int64

	database.DB.Model(&models.User{}).Count(&userCount)
	database.DB.Model(&models.BlogPost{}).Where("type = ?", "blog").Count(&blogCount)
	database.DB.Model(&models.BlogPost{}).Where("type = ?", "news").Count(&newsCount)
	database.DB.Model(&models.Subscriber{}).Where("is_active = ?", true).Count(&subscriberCount)

	respondJSON(w, map[string]interface{}{
		"users":       userCount,
		"blogs":       blogCount,
		"news":        newsCount,
		"subscribers": subscriberCount,
	})
}

// --- Analytics ---

func GetSubscriberAnalytics(w http.ResponseWriter, r *http.Request) {
	var activeCount, inactiveCount int64
	database.DB.Model(&models.Subscriber{}).Where("is_active = ?", true).Count(&activeCount)
	database.DB.Model(&models.Subscriber{}).Where("is_active = ?", false).Count(&inactiveCount)

	// Weekly Subscription Report (New subscribers in last 7 days)
	var newThisWeek int64
	oneWeekAgo := time.Now().AddDate(0, 0, -7)
	database.DB.Model(&models.Subscriber{}).Where("created_at >= ?", oneWeekAgo).Count(&newThisWeek)

	// Specific Topics Breakdown
	targetTopics := []string{
		"Monthly Newsletter",
		"Weekly Election News Update (The Ballot)",
		"GenZ Blog Series",
		"Research, Reports, Policy Briefs & Knowledge Products",
		"Press Releases, Stories & Democracy Updates",
		"Opportunities: Events Webinars & Open Calls",
	}

	var subscribers []models.Subscriber
	database.DB.Find(&subscribers)

	topicsMap := make(map[string]int)
	// Initialize with 0
	for _, t := range targetTopics {
		topicsMap[t] = 0
	}

	for _, sub := range subscribers {
		if sub.IsActive {
			// Subscriptions is []string
			for _, userTopic := range sub.Subscriptions {
				for _, target := range targetTopics {
					if userTopic == target {
						topicsMap[target]++
					}
				}
			}
		}
	}

	respondJSON(w, map[string]interface{}{
		"total_active":       activeCount,
		"total_unsubscribed": inactiveCount,
		"new_this_week":      newThisWeek,
		"topic_breakdown":    topicsMap,
	})
}

// --- File Upload ---

func HandleFileUpload(w http.ResponseWriter, r *http.Request) {
	// maximize upload size appropriately
	r.ParseMultipartForm(10 << 20) // 10 MB

	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Ensure unique filename
	filename := fmt.Sprintf("%d-%s", time.Now().Unix(), handler.Filename)

	// Assuming running from backend/ directory, save to ../src/assets
	uploadPath := filepath.Join("..", "src", "assets", filename)

	dst, err := os.Create(uploadPath)
	if err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}

	respondJSON(w, map[string]string{
		"url":      fmt.Sprintf("/src/assets/%s", filename),
		"filename": filename,
	})
}

// --- Hero Content ---

func GetHeroContent(w http.ResponseWriter, r *http.Request) {
	page := chi.URLParam(r, "page")
	var content models.HeroContent
	if err := database.DB.Where("page = ?", page).First(&content).Error; err != nil {
		// Return empty if not found, or default
		respondJSON(w, models.HeroContent{Page: page})
		return
	}
	respondJSON(w, content)
}

func UpdateHeroContent(w http.ResponseWriter, r *http.Request) {
	var content models.HeroContent
	if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Upsert based on page
	var existing models.HeroContent
	if err := database.DB.Where("page = ?", content.Page).First(&existing).Error; err == nil {
		content.ID = existing.ID
	}

	if err := database.DB.Save(&content).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, content)
}

// --- Audit Logs ---

func GetAuditLogs(w http.ResponseWriter, r *http.Request) {
	var logs []models.AuditLog
	database.DB.Order("created_at desc").Find(&logs)
	respondJSON(w, logs)
}

func CreateAuditLog(w http.ResponseWriter, r *http.Request) {
	var log models.AuditLog
	if err := json.NewDecoder(r.Body).Decode(&log); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Ensure timestamp is set if missing
	if log.Timestamp == "" {
		log.Timestamp = time.Now().Format(time.RFC3339)
	}

	if err := database.DB.Create(&log).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, log)
}
