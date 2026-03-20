import { registerApplication, start, LifeCycles } from "single-spa";

// Initialize dark mode from system preference or localStorage
function initDarkMode(): void {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

initDarkMode();

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

// Route matching functions
function isHomePage(location: Location): boolean {
  return location.pathname === "/" || location.pathname === "";
}

function isMediaUploadPage(location: Location): boolean {
  return location.pathname === "/media-upload";
}

function isNotFoundPage(location: Location): boolean {
  return !isHomePage(location) && !isMediaUploadPage(location);
}

// Container visibility management
const containers = {
  navbar: document.getElementById("navbar-container"),
  mainContent: document.getElementById("main-content-container"),
  mediaUpload: document.getElementById("media-upload-container"),
  notFound: document.getElementById("not-found-container"),
};

function updateContainerVisibility(): void {
  const showHome = isHomePage(window.location);
  const showMediaUpload = isMediaUploadPage(window.location);
  const showNotFound = !showHome && !showMediaUpload;

  containers.navbar?.classList.toggle("mfe-hidden", !showHome);
  containers.mainContent?.classList.toggle("mfe-hidden", !showHome);
  containers.mediaUpload?.classList.toggle("mfe-hidden", !showMediaUpload);
  containers.notFound?.classList.toggle("mfe-hidden", !showNotFound);
}

// Set initial visibility and listen for route changes
updateContainerVisibility();
window.addEventListener("single-spa:routing-event", updateContainerVisibility);

// Register navbar micro-frontend (only on home page)
registerApplication({
  name: "@portfolio/navbar",
  app: () => import("@portfolio/navbar") as Promise<LifeCycles>,
  activeWhen: isHomePage,
  customProps: {
    domElement: document.getElementById("navbar-container"),
  },
});

// Register main-content micro-frontend (only on home page)
registerApplication({
  name: "@portfolio/main-content",
  app: () => import("@portfolio/main-content") as Promise<LifeCycles>,
  activeWhen: isHomePage,
  customProps: {
    domElement: document.getElementById("main-content-container"),
  },
});

// Register media-upload micro-frontend
registerApplication({
  name: "@portfolio/media-upload",
  app: () => import("@portfolio/media-upload") as Promise<LifeCycles>,
  activeWhen: isMediaUploadPage,
  customProps: {
    domElement: document.getElementById("media-upload-container"),
  },
});

// Register not-found micro-frontend (on all other routes)
registerApplication({
  name: "@portfolio/not-found",
  app: () => import("@portfolio/not-found") as Promise<LifeCycles>,
  activeWhen: isNotFoundPage,
  customProps: {
    domElement: document.getElementById("not-found-container"),
  },
});

// Start single-spa
start({
  urlRerouteOnly: true,
});

console.log("[Root Config] Single-spa started successfully");
