// layout.js
"use client";
import React from "react";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "../store/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body >
          <MantineProvider>
            <main>
              {children}
            </main>
          </MantineProvider>
        </body>
      </html>
    </Provider>
  );
}
