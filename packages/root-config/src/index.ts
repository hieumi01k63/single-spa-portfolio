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

// Register navbar micro-frontend
registerApplication({
  name: "@portfolio/navbar",
  app: () => import("@portfolio/navbar") as Promise<LifeCycles>,
  activeWhen: ["/"],
  customProps: {
    domElement: document.getElementById("navbar-container"),
  },
});

// Register main-content micro-frontend
registerApplication({
  name: "@portfolio/main-content",
  app: () => import("@portfolio/main-content") as Promise<LifeCycles>,
  activeWhen: ["/"],
  customProps: {
    domElement: document.getElementById("main-content-container"),
  },
});

// Start single-spa
start({
  urlRerouteOnly: true,
});

console.log("[Root Config] Single-spa started successfully");
