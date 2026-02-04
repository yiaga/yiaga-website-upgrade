package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func SubmitContact(w http.ResponseWriter, r *http.Request) {
	var message models.ContactMessage
	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Initial status
	message.Status = "new"

	result := database.DB.Create(&message)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Contact form submitted successfully"})
}

func SubscribeNewsletter(w http.ResponseWriter, r *http.Request) {
	var sub models.Subscriber
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sub.IsActive = true
	sub.SubscribedAt = time.Now()

	result := database.DB.Create(&sub)
	if result.Error != nil {
		// handle duplicate email gracefully potentially
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Subscribed successfully"})
}
