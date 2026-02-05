import singleSpaHtml from "single-spa-html";
import template from "./not-found.html";
import "./styles.css";

const lifecycles = singleSpaHtml({
  template,
});

// Wrap mount to update the URL display
const originalMount = lifecycles.mount;
lifecycles.mount = async (props: Record<string, unknown>) => {
  await originalMount(props);

  // Update the displayed URL after mounting
  const urlElement = document.getElementById("not-found-url");
  if (urlElement) {
    urlElement.textContent = window.location.pathname;
  }
};

export const { bootstrap, mount, unmount } = lifecycles;
