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

function isNotFoundPage(location: Location): boolean {
  return !isHomePage(location);
}

// Container visibility management
const containers = {
  navbar: document.getElementById("navbar-container"),
  mainContent: document.getElementById("main-content-container"),
  notFound: document.getElementById("not-found-container"),
};

function updateContainerVisibility(): void {
  const showHome = isHomePage(window.location);

  containers.navbar?.classList.toggle("mfe-hidden", !showHome);
  containers.mainContent?.classList.toggle("mfe-hidden", !showHome);
  containers.notFound?.classList.toggle("mfe-hidden", showHome);
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
