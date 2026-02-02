declare module "*.html" {
  const content: string;
  export default content;
}

declare module "single-spa-html" {
  interface SingleSpaHtmlOptions {
    template: string | ((props: Record<string, unknown>) => string);
    domElementGetter?: (props: Record<string, unknown>) => HTMLElement;
  }

  interface SingleSpaHtmlLifecycles {
    bootstrap: (props: Record<string, unknown>) => Promise<void>;
    mount: (props: Record<string, unknown>) => Promise<void>;
    unmount: (props: Record<string, unknown>) => Promise<void>;
  }

  export default function singleSpaHtml(
    options: SingleSpaHtmlOptions
  ): SingleSpaHtmlLifecycles;
}
