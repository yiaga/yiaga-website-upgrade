package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

// Public Helpers
func GetBlogs(w http.ResponseWriter, r *http.Request) {
	var posts []models.BlogPost
	// Filter by type if provided (blog vs news) or any other filters
	query := database.DB.Model(&models.BlogPost{}).Order("published_at desc")

	typeParam := r.URL.Query().Get("type")
	if typeParam != "" {
		query = query.Where("type = ?", typeParam)
	}

	category := r.URL.Query().Get("category")
	if category != "" && category != "All" {
		query = query.Where("category = ?", category)
	}

	result := query.Find(&posts)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, posts)
}

func GetBlogBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	var post models.BlogPost
	result := database.DB.Where("slug = ?", slug).First(&post)
	if result.Error != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}
	respondJSON(w, post)
}

// Admin Handlers
func CreateBlogPost(w http.ResponseWriter, r *http.Request) {
	var post models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Generate slug if empty
	if post.Slug == "" {
		post.Slug = strings.ToLower(strings.ReplaceAll(post.Title, " ", "-")) + "-" + fmt.Sprintf("%d", time.Now().Unix())
	}

	if err := database.DB.Create(&post).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, post)
}

func UpdateBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var post models.BlogPost
	if err := database.DB.First(&post, id).Error; err != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	var input models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update fields
	post.Title = input.Title
	post.Content = input.Content
	post.Excerpt = input.Excerpt
	post.Image = input.Image
	post.Category = input.Category
	post.Author = input.Author

	if err := database.DB.Save(&post).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, post)
}

func DeleteBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.BlogPost{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}
