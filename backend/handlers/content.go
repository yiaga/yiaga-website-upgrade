package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

// --- Announcements ---

func GetAnnouncements(w http.ResponseWriter, r *http.Request) {
	var announcements []models.Announcement
	// Only return published announcements
	result := database.DB.Where("status = ?", "published").Order("published_at desc").Find(&announcements)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, announcements)
}

func CreateAnnouncement(w http.ResponseWriter, r *http.Request) {
	var announcement models.Announcement
	if err := json.NewDecoder(r.Body).Decode(&announcement); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	announcement.PublishedAt = time.Now()
	result := database.DB.Create(&announcement)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, announcement)
}

func DeleteAnnouncement(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.Announcement{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}

// --- Resources ---

func GetResources(w http.ResponseWriter, r *http.Request) {
	var resources []models.Resource
	query := database.DB.Model(&models.Resource{}).Order("published_at desc")

	category := r.URL.Query().Get("category")
	if category != "" && category != "All" {
		query = query.Where("category = ?", category)
	}

	result := query.Find(&resources)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, resources)
}

func CreateResource(w http.ResponseWriter, r *http.Request) {
	var res models.Resource
	if err := json.NewDecoder(r.Body).Decode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	res.PublishedAt = time.Now()
	if err := database.DB.Create(&res).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, res)
}

func DeleteResource(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.Resource{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}

// --- Partners ---

func GetPartners(w http.ResponseWriter, r *http.Request) {
	var partners []models.Partner
	database.DB.Find(&partners)
	respondJSON(w, partners)
}

func CreatePartner(w http.ResponseWriter, r *http.Request) {
	var p models.Partner
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	database.DB.Create(&p)
	respondJSON(w, p)
}

func DeletePartner(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	database.DB.Delete(&models.Partner{}, id)
	respondJSON(w, map[string]string{"message": "Deleted"})
}

// --- Badges ---

func GetBadges(w http.ResponseWriter, r *http.Request) {
	var badges []models.Badge
	database.DB.Find(&badges)
	respondJSON(w, badges)
}

func CreateBadge(w http.ResponseWriter, r *http.Request) {
	var b models.Badge
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	database.DB.Create(&b)
	respondJSON(w, b)
}

func DeleteBadge(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	database.DB.Delete(&models.Badge{}, id)
	respondJSON(w, map[string]string{"message": "Deleted"})
}
