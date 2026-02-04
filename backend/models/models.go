package models

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// --- Database Models ---

// Announcement - Updated by staff
type Announcement struct {
	gorm.Model
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Date        string    `json:"date"`
	Link        string    `json:"link"`
	Image       string    `json:"image"`
	Status      string    `json:"status" gorm:"default:'published'"` // draft, published
	PublishedAt time.Time `json:"published_at"`
}

// BlogPost - Blog posts and News items
type BlogPost struct {
	gorm.Model
	Title       string    `json:"title"`
	Slug        string    `json:"slug" gorm:"uniqueIndex"`
	Excerpt     string    `json:"excerpt"`
	Content     string    `json:"content" gorm:"type:text"` // Rich text content
	Date        string    `json:"date"`                     // Using string to match frontend data for now
	Image       string    `json:"image"`                    // URL to image
	Author      string    `json:"author"`
	Category    string    `json:"category"` // e.g., "The Ballot", "Technology"
	IsFeatured  bool      `json:"featured"`
	Type        string    `json:"type"`                        // "blog" or "news"
	Tags        []string  `json:"tags" gorm:"serializer:json"` // JSON array of tags
	AuthorRole  string    `json:"author_role"`
	PdfUrl      string    `json:"pdf_url"` // Optional link to PDF
	PublishedAt time.Time `json:"published_at"`
}

// Initiative - Projects and Initiatives
type Initiative struct {
	gorm.Model
	Title           string   `json:"title"`
	Slug            string   `json:"slug" gorm:"uniqueIndex"`
	Category        string   `json:"category"`
	Description     string   `json:"description" gorm:"type:text"`
	FullDescription string   `json:"full_description" gorm:"type:text"`
	Content         string   `json:"content" gorm:"type:text"`
	Status          string   `json:"status"` // e.g., "Ongoing", "Completed"
	Location        string   `json:"location"`
	Image           string   `json:"image"`
	Activities      []string `json:"activities" gorm:"serializer:json"` // List of activities
	Stats           []Stat   `json:"stats" gorm:"serializer:json"`
	Color           string   `json:"color"`
}

type Stat struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

// Resource - Downloadable reports, pdfs, videos
type Resource struct {
	gorm.Model
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Type        string    `json:"type"`     // "PDF Report", "E-Book", "Video"
	Category    string    `json:"category"` // "Reports", "Toolkits"
	FileUrl     string    `json:"file_url"` // Link to download
	FileSize    string    `json:"file_size"`
	Downloads   string    `json:"downloads"` // Using string to match "2.5K" format
	Date        string    `json:"date"`
	PublishedAt time.Time `json:"published_at"`
	Icon        string    `json:"icon"` // Name of icon to use on frontend
}

// Job - Careers & Opportunities
type Job struct {
	gorm.Model
	Title        string   `json:"title"`
	Department   string   `json:"department"`
	Location     string   `json:"location"`
	Type         string   `json:"type"` // "Full-time", "Contract"
	Description  string   `json:"description" gorm:"type:text"`
	Requirements []string `json:"requirements" gorm:"serializer:json"`
	Posted       string   `json:"posted"`
	IsActive     bool     `json:"is_active" gorm:"default:true"`
}

// Comment - Blog/News discussions
type Comment struct {
	gorm.Model
	Content   string `json:"content"`
	Author    string `json:"author"`
	Email     string `json:"email"`
	PostID    uint   `json:"post_id"`                         // ID of the blog/news post
	PostTitle string `json:"post_title"`                      // Title for display in admin
	Status    string `json:"status" gorm:"default:'pending'"` // pending, approved, rejected
	Date      string `json:"date"`                            // Formatted date
}

// AuditLog - System activity
type AuditLog struct {
	gorm.Model
	Action    string `json:"action"`
	Details   string `json:"details"`
	UserID    string `json:"user_id"`
	UserName  string `json:"user_name"`
	UserRole  string `json:"user_role"`
	IPAddress string `json:"ip_address"`
	Timestamp string `json:"timestamp"` // ISO string
}

// ContactMessage - Form submissions
type ContactMessage struct {
	gorm.Model
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
	Status  string `json:"status" gorm:"default:'new'"` // new, read, archived
}

// Subscriber - Newsletter Subscribers
type Subscriber struct {
	gorm.Model
	Email         string    `json:"email" gorm:"uniqueIndex"`
	Subscriptions []string  `json:"subscriptions" gorm:"serializer:json"` // List of selected topics
	IsActive      bool      `json:"is_active" gorm:"default:true"`
	SubscribedAt  time.Time `json:"subscribed_at"`
}

// User - Admin Users for CMS
type User struct {
	gorm.Model
	Username string `json:"username" gorm:"uniqueIndex"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"-"`    // Hashed password to be added later
	Role     string `json:"role"` // "admin", "editor"
}

// HeroContent - CMS for Hero Section
type HeroContent struct {
	gorm.Model
	Page            string `json:"page" gorm:"uniqueIndex"` // "home", "about", etc.
	Title           string `json:"title"`
	TitleHighlight  string `json:"title_highlight"`
	Description     string `json:"description"`
	CTAText         string `json:"cta_text"`
	CTALink         string `json:"cta_link"`
	SecondCTAText   string `json:"second_cta_text"`
	SecondCTALink   string `json:"second_cta_link"`
	BackgroundImage string `json:"background_image"`
}

// Partner - Partners & Supporters
type Partner struct {
	gorm.Model
	Name    string `json:"name"`
	Logo    string `json:"logo"`
	Website string `json:"website"`
}

// Badge - Badges of Excellence
type Badge struct {
	gorm.Model
	Name        string `json:"name"`
	Image       string `json:"image"`
	Description string `json:"description"`
}
