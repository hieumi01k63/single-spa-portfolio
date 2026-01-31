import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { Navbar } from "./components/Navbar";
import "./styles/globals.css";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Navbar,
  errorBoundary(err, _info, _props) {
    console.error("[Navbar] Error:", err);
    return (
      <div className="p-4 text-red-500">
        <h2>Navbar Error</h2>
        <pre>{err.message}</pre>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
