package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func GetJobs(w http.ResponseWriter, r *http.Request) {
	var jobs []models.Job
	query := database.DB.Model(&models.Job{}).Order("created_at desc")
	if r.URL.Query().Get("all") != "true" {
		query = query.Where("is_active = ?", true)
	}

	result := query.Find(&jobs)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, jobs)
}

func CreateJob(w http.ResponseWriter, r *http.Request) {
	var job models.Job
	if err := json.NewDecoder(r.Body).Decode(&job); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	job.Posted = time.Now().Format("Jan 2, 2006") // Simple date string or use hook
	if err := database.DB.Create(&job).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, job)
}

func UpdateJob(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var job models.Job
	if err := database.DB.First(&job, id).Error; err != nil {
		http.Error(w, "Job not found", http.StatusNotFound)
		return
	}
	var input models.Job
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Update fields
	job.Title = input.Title
	job.Department = input.Department
	job.Location = input.Location
	job.Type = input.Type
	job.Description = input.Description
	job.Requirements = input.Requirements
	job.IsActive = input.IsActive

	if err := database.DB.Save(&job).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, job)
}

func DeleteJob(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.Job{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}
