import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chocojams from "../routes/Chocojams";
import Stellajang from "../routes/Stellajang";
import Write from "../routes/Write";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chocojams />} />
      </Routes>
      <Routes>
        <Route path="/write" element={<Write />} />
      </Routes>

      <Routes>
        <Route path="/happybirthdaystellajang2022" element={<Stellajang />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
