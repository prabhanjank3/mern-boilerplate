/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Apple } from './components/Apple';
import DefaultLayout from './layouts/Default';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Apple />} />
          <Route path="another" element={<>Another</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
