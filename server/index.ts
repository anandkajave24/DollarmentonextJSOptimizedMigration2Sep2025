import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Domain redirect middleware - redirect www.dollarmento.com to dollarmento.com
app.use((req, res, next) => {
  if (req.hostname === 'www.dollarmento.com') {
    return res.redirect(301, 'https://dollarmento.com' + req.url);
  }
  next();
});

// Special routes for Facebook policy compliance
// These must come before other middleware to ensure they are directly accessible
app.get('/datadeletion', (req, res) => {
  const filePath = path.join(process.cwd(), 'client/public/datadeletion.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Data Deletion page not found');
  }
});

app.get('/privacypolicy', (req, res) => {
  const filePath = path.join(process.cwd(), 'client/public/privacypolicy.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Privacy Policy page not found');
  }
});

app.get('/termsofservice', (req, res) => {
  const filePath = path.join(process.cwd(), 'client/public/termsofservice.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Terms of Service page not found');
  }
});

// SEO and crawling essential routes
app.get('/robots.txt', (req, res) => {
  const filePath = path.join(process.cwd(), 'client/public/robots.txt');
  if (fs.existsSync(filePath)) {
    res.type('text/plain');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Robots.txt not found');
  }
});

app.get('/sitemap.xml', (req, res) => {
  const filePath = path.join(process.cwd(), 'client/public/sitemap.xml');
  if (fs.existsSync(filePath)) {
    res.type('application/xml');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Sitemap.xml not found');
  }
});

// Google site verification file
app.get('/google9e2938c06a91c4f9.html', (req, res) => {
  const filePath = path.join(process.cwd(), 'client/public/google9e2938c06a91c4f9.html');
  if (fs.existsSync(filePath)) {
    res.type('text/html');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Google verification file not found');
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register API routes first, before Vite middleware
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite after API routes to prevent interference
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
