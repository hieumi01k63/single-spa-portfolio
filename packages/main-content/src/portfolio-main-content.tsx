import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { MainContent } from "./components/MainContent";
import "./styles/globals.css";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: MainContent,
  errorBoundary(err, _info, _props) {
    console.error("[Main Content] Error:", err);
    return (
      <div className="p-4 text-red-500">
        <h2>Main Content Error</h2>
        <pre>{err.message}</pre>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
