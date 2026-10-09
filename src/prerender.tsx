import { renderToString } from 'react-dom/server';
import React from 'react';
import { RouterProvider } from './router';
import App from './App';

export function prerender({ url }: { url: string }) {
  const html = renderToString(
    <RouterProvider initialPath={url}>
      <App />
    </RouterProvider>
  );
  return { html };
}
