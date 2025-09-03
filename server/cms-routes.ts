import express from 'express';
// Auth removed - open access CMS
import { IStorage } from './storage';
import { insertContentPageSchema, insertBlogPostSchema, insertSeoSettingsSchema, insertLandingPageSchema } from '../shared/content-schema';

export function createCMSRoutes(storage: IStorage) {
  const router = express.Router();

  // Open access - no authentication required
  const noAuth = (req: any, res: any, next: any) => {
    req.user = { id: 'guest', email: 'guest@rupeesmart.com' };
    next();
  };

  // Login disabled - open access
  router.post('/auth/login', async (req, res) => {
    res.json({
      message: "Open access - no authentication required",
      user: { id: 'guest', email: 'guest@rupeesmart.com', role: 'guest' }
    });
  });

  // Content Pages Routes
  router.get('/content-pages', noAuth, async (req, res) => {
    try {
      // Mock data for now - replace with actual database calls
      const pages = [
        {
          id: 1,
          slug: 'mortgage-calculator-guide',
          title: 'Complete Guide to Mortgage Calculators',
          metaDescription: 'Learn how to use mortgage calculators effectively for home buying decisions.',
          published: true,
          category: 'calculator-guides',
          updatedAt: '2025-01-27T00:00:00Z'
        },
        {
          id: 2,
          slug: '401k-retirement-planning',
          title: '401k Calculator: Retirement Planning Made Simple',
          metaDescription: 'Master 401k calculations and retirement planning with our comprehensive guide.',
          published: false,
          category: 'retirement',
          updatedAt: '2025-01-26T00:00:00Z'
        }
      ];
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch content pages' });
    }
  });

  router.post('/content-pages', noAuth, async (req, res) => {
    try {
      const validatedData = insertContentPageSchema.parse(req.body);
      
      // Mock response - replace with actual database insert
      const newPage = {
        id: Date.now(),
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json(newPage);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data provided' });
    }
  });

  router.put('/content-pages/:id', noAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertContentPageSchema.parse(req.body);
      
      // Mock response - replace with actual database update
      const updatedPage = {
        id,
        ...validatedData,
        updatedAt: new Date().toISOString()
      };
      
      res.json(updatedPage);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update content page' });
    }
  });

  router.delete('/content-pages/:id', noAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // Mock response - replace with actual database delete
      res.json({ message: 'Content page deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete content page' });
    }
  });

  // Blog Posts Routes
  router.get('/blog-posts', noAuth, async (req, res) => {
    try {
      const posts = [
        {
          id: 1,
          slug: 'best-mortgage-calculators',
          title: 'Best Mortgage Calculators',
          excerpt: 'Compare the top mortgage calculators and find the perfect tool for your home buying journey.',
          published: true,
          category: 'calculator-guides',
          readTime: 8,
          updatedAt: '2025-01-27T00:00:00Z'
        }
      ];
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  router.post('/blog-posts', noAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      
      const newPost = {
        id: Date.now(),
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ error: 'Invalid blog post data' });
    }
  });

  // SEO Settings Routes
  router.get('/seo-settings', noAuth, async (req, res) => {
    try {
      const seoSettings = [
        {
          id: 1,
          pagePath: '/mortgage-calculator',
          title: 'Free Mortgage Calculator - Calculate Monthly Payments',
          metaDescription: 'Use our free mortgage calculator to estimate monthly payments, compare loan terms, and find the best mortgage rates for your home purchase.',
          keywords: 'mortgage calculator, monthly payment calculator, home loan calculator',
          robots: 'index,follow'
        },
        {
          id: 2,
          pagePath: '/401k-calculator',
          title: '401k Calculator - Retirement Planning Tool',
          metaDescription: 'Plan your retirement with our 401k calculator. Calculate compound growth, employer matching, and retirement projections.',
          keywords: '401k calculator, retirement calculator, 401k planning',
          robots: 'index,follow'
        }
      ];
      res.json(seoSettings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch SEO settings' });
    }
  });

  router.post('/seo-settings', noAuth, async (req, res) => {
    try {
      const validatedData = insertSeoSettingsSchema.parse(req.body);
      
      const newSettings = {
        id: Date.now(),
        ...validatedData,
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json(newSettings);
    } catch (error) {
      res.status(400).json({ error: 'Invalid SEO settings data' });
    }
  });

  router.put('/seo-settings/:path', noAuth, async (req, res) => {
    try {
      const pagePath = decodeURIComponent(req.params.path);
      const validatedData = insertSeoSettingsSchema.parse(req.body);
      
      const updatedSettings = {
        ...validatedData,
        pagePath,
        updatedAt: new Date().toISOString()
      };
      
      res.json(updatedSettings);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update SEO settings' });
    }
  });

  // Landing Pages Routes
  router.get('/landing-pages', noAuth, async (req, res) => {
    try {
      const landingPages = [
        {
          id: 1,
          slug: 'best-mortgage-calculator',
          title: 'Best Mortgage Calculator',
          headline: 'Find Your Perfect Home Loan with Our Advanced Calculator',
          subheadline: 'Get accurate monthly payments, compare rates, and make informed decisions',
          published: true,
          targetCalculator: 'mortgage-calculator',
          updatedAt: '2025-01-27T00:00:00Z'
        }
      ];
      res.json(landingPages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch landing pages' });
    }
  });

  router.post('/landing-pages', noAuth, async (req, res) => {
    try {
      const validatedData = insertLandingPageSchema.parse(req.body);
      
      const newLandingPage = {
        id: Date.now(),
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      res.status(201).json(newLandingPage);
    } catch (error) {
      res.status(400).json({ error: 'Invalid landing page data' });
    }
  });

  // Dashboard stats
  router.get('/dashboard/stats', noAuth, async (req, res) => {
    try {
      const stats = {
        totalContent: 24,
        publishedContent: 18,
        drafts: 6,
        seoPages: 36,
        recentActivity: [
          {
            type: 'published',
            message: '401k Calculator Guide updated by SEO Team',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            type: 'draft',
            message: 'New landing page: Best Mortgage Calculators',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          },
          {
            type: 'seo',
            message: 'Meta descriptions updated for 5 calculator pages',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  });

  return router;
}