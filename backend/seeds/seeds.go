package seeds

import (
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func SeedData() {
	var count int64

	// Seed Announcements
	database.DB.Model(&models.Announcement{}).Count(&count)
	if count == 0 {
		announcements := []models.Announcement{
			{
				Title:       "NVIS (National Voting Intentions Survey) Report 1 is released",
				Description: "Our comprehensive survey on national voting intentions is now available. Gain insights into the current political landscape and voter sentiment across the country.",
				Date:        "January 28, 2026",
				PublishedAt: time.Date(2026, 1, 28, 0, 0, 0, 0, time.UTC),
				Link:        "#",
				Image:       "/src/assets/nvis-report.jpg",
				Status:      "published",
			},
			{
				Title:       "Youth Civic Engagement Summit 2025",
				Description: "Join us for our annual summit bringing together young leaders from across Africa to discuss civic participation, democratic governance, and community development.",
				Date:        "January 15, 2025",
				PublishedAt: time.Date(2025, 1, 15, 0, 0, 0, 0, time.UTC),
				Link:        "#",
				Image:       "/src/assets/discuss.jpg",
				Status:      "published",
			},
			{
				Title:       "Yiaga Africa have acquired ED Certified by NGOsource",
				Description: "We are pleased to announce that Yiaga Africa has achieved Equivalency Determination (ED) certification, further validating our commitment to transparency and global standards.",
				Date:        "November 28, 2024",
				PublishedAt: time.Date(2024, 11, 28, 0, 0, 0, 0, time.UTC),
				Link:        "#",
				Image:       "/src/assets/ngosource-ed.jpg",
				Status:      "published",
			},
		}
		for _, a := range announcements {
			database.DB.Create(&a)
		}
		log.Println("Database seeded with initial announcements")
	}

	// Seed Blog Posts & News
	posts := []models.BlogPost{
		// Blogs
		{
			Title:       "The Role of Technology in Strengthening Electoral Processes",
			Slug:        "technology-strengthening-electoral-processes",
			Excerpt:     "Exploring how digital innovations are transforming election monitoring and citizen engagement across Africa.",
			Content:     "Technology has become an indispensable tool in modern election observation and democratic participation...",
			Date:        "Dec 4, 2024",
			PublishedAt: time.Date(2024, 12, 4, 0, 0, 0, 0, time.UTC),
			Author:      "Dr. Hussaini Abdu",
			AuthorRole:  "Country Director",
			Category:    "Technology",
			Image:       "/src/assets/blog-1.jpg",
			IsFeatured:  true,
			Type:        "blog",
		},
		{
			Title:       "Why Youth Participation in Politics Matters Now More Than Ever",
			Slug:        "youth-participation-politics-matters",
			Excerpt:     "Young people represent the future of democracy. Here's why their involvement is crucial.",
			Content:     "The future of democracy in Africa lies in the hands of its youth...",
			Date:        "Dec 2, 2024",
			PublishedAt: time.Date(2024, 12, 2, 0, 0, 0, 0, time.UTC),
			Author:      "Cynthia Mbamalu",
			AuthorRole:  "Director of Programs",
			Category:    "Youth",
			Image:       "/src/assets/blog-2.jpg",
			Type:        "blog",
		},
		{
			Title:       "GenZ Series: The Power of Youth in Governance",
			Slug:        "genz-series-power-youth-governance",
			Excerpt:     "Exploring how the GenZ generation is redefining political participation and civic engagement.",
			Content:     "The GenZ generation is more informed, connected, and active than any generation before. This series explores their unique approach to governance...\n\n### The Rise of Digital Activism\nGenZ has mastered the art of using digital platforms for social change...\n\n### Redefining Leadership\nWhat does leadership look like for the next generation?",
			Date:        "Feb 4, 2026",
			PublishedAt: time.Date(2026, 2, 4, 0, 0, 0, 0, time.UTC),
			Author:      "Yiaga Africa Communications",
			AuthorRole:  "Editorial Team",
			Category:    "GenZ Series",
			Image:       "/src/assets/discuss.jpg",
			Type:        "blog",
			PdfUrl:      "/src/assets/blog/pdfs/GENZ-BLOG-W1-bold.pdf",
		},
		// News Items
		{
			Title:       "Yiaga Africa Deploys Observers for Upcoming State Elections",
			Slug:        "yiaga-africa-deploys-observers",
			Excerpt:     "Over 5,000 citizen observers have been trained and deployed to monitor the upcoming gubernatorial elections.",
			Content:     "In preparation for the upcoming gubernatorial elections, Yiaga Africa has successfully trained...",
			Date:        "Dec 5, 2024",
			PublishedAt: time.Date(2024, 12, 5, 0, 0, 0, 0, time.UTC),
			Author:      "Editorial Team",
			AuthorRole:  "Yiaga Africa",
			Category:    "Elections",
			Image:       "/src/assets/news-1.jpg",
			IsFeatured:  true,
			Type:        "news",
		},
		{
			Title:       "Youth Political Participation Workshop Concludes in Abuja",
			Slug:        "youth-political-participation-workshop",
			Excerpt:     "The three-day intensive workshop trained 200 young leaders on effective political engagement strategies.",
			Content:     "The Ready To Run program concluded its latest workshop in Abuja...",
			Date:        "Dec 3, 2024",
			PublishedAt: time.Date(2024, 12, 3, 0, 0, 0, 0, time.UTC),
			Author:      "Communications Team",
			AuthorRole:  "Yiaga Africa",
			Category:    "Training",
			Image:       "/src/assets/news-2.jpg",
			Type:        "news",
		},
	}
	for _, p := range posts {
		var existing models.BlogPost
		if err := database.DB.Where("slug = ?", p.Slug).First(&existing).Error; err != nil {
			database.DB.Create(&p)
		}
	}
	log.Println("Database seeded with blogs and news")

	// Seed Initiatives
	database.DB.Model(&models.Initiative{}).Count(&count)
	if count == 0 {
		initiatives := []models.Initiative{
			{
				Title:           "Watching The Vote",
				Slug:            "watching-the-vote",
				Category:        "Election Monitoring",
				Description:     "Nigeria's largest citizen-led election observation initiative, deploying technology and trained observers to monitor elections in real-time.",
				FullDescription: "Watching The Vote (WTV) represents a groundbreaking approach to citizen-led election observation in Nigeria.",
				Stats: []models.Stat{
					{Label: "Observers Deployed", Value: "10,000+"},
					{Label: "Polling Units", Value: "25,000+"},
				},
				Image: "/src/assets/initiative-1.jpg",
				Color: "primary",
			},
			{
				Title:           "Ready To Run",
				Slug:            "ready-to-run",
				Category:        "Youth Leadership",
				Description:     "Empowering young people, especially women, with the skills and knowledge to run for political office.",
				FullDescription: "Ready To Run is a comprehensive leadership development program designed to prepare young Nigerians for political participation.",
				Stats: []models.Stat{
					{Label: "Youth Trained", Value: "5,000+"},
					{Label: "Women Participants", Value: "60%"},
				},
				Image: "/src/assets/initiative-2.jpg",
				Color: "secondary",
			},
		}
		for _, i := range initiatives {
			database.DB.Create(&i)
		}
		log.Println("Database seeded with initiatives")
	}

	// Seed Resources
	database.DB.Model(&models.Resource{}).Count(&count)
	if count == 0 {
		resources := []models.Resource{
			{
				Title:       "Election Observation Report 2023",
				Description: "Comprehensive analysis of the 2023 general elections in Nigeria.",
				Type:        "PDF Report",
				Category:    "Reports",
				FileUrl:     "#",
				FileSize:    "4.2 MB",
				Downloads:   "2.5K",
				Date:        "March 2024",
				PublishedAt: time.Now(),
			},
			{
				Title:       "Citizen's Guide to Voting",
				Description: "Everything you need to know about your voting rights and the electoral process.",
				Type:        "E-Book",
				Category:    "E-Books",
				FileUrl:     "#",
				FileSize:    "2.8 MB",
				Downloads:   "8.1K",
				Date:        "January 2024",
				PublishedAt: time.Now(),
			},
		}
		for _, r := range resources {
			database.DB.Create(&r)
		}
		log.Println("Database seeded with resources")
	}

	// Seed Jobs
	database.DB.Model(&models.Job{}).Count(&count)
	if count == 0 {
		// Currently no jobs in the hardcoded data, but we can add a test one or leave it empty as per request?
		// User asked "dummy data for all tables". Let's add one dummy job.
		job := models.Job{
			Title:        "Program Officer, Elections",
			Department:   "Elections",
			Location:     "Abuja",
			Type:         "Full-time",
			Description:  "We are seeking a dedicated Program Officer to support our election observation projects.",
			Requirements: []string{"Bachelor's degree", "3 years experience", "Strong analytical skills"},
			Posted:       "2 days ago",
			IsActive:     true,
		}
		database.DB.Create(&job)
		log.Println("Database seeded with jobs")
	}
	// Seed Users (Admin)
	database.DB.Model(&models.User{}).Count(&count)
	// Check if specific admin exists to be safe
	var adminUser models.User
	if err := database.DB.Where("email = ?", "admin@yiaga.org").First(&adminUser).Error; err != nil {
		// Admin not found, create it
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		admin := models.User{
			Username: "Yiaga Admin",
			Email:    "admin@yiaga.org",
			Role:     "admin",
			Password: string(hashedPassword),
		}
		database.DB.Create(&admin)
		log.Println("Database seeded with Admin user")
	}
}
