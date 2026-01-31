declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Micro-frontend module declarations
declare module "@portfolio/navbar";
declare module "@portfolio/main-content";
declare module "@portfolio/shared";
