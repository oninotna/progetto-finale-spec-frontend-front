import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import HomePage from "./Pages/HomePage";
import { BikesProvider } from "./Contexts/BikesContext";
import DetailPage from "./Pages/DetailPage";
import ComparisonPage from "./Pages/ComparisonPage";
import WishlistPage from "./Pages/WishlistPage";
import NotFoundPage from "./Pages/NotFoundPage";

export default function App() {



  return (
    <>
    <BikesProvider>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<DefaultLayout />}>
           <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
           <Route path='/detail-page/:id' element={<DetailPage />} />
           <Route path='/comparison-page' element={<ComparisonPage />} />
           <Route path="/wishlist-page" element={<WishlistPage />} />
         </Route>
       </Routes>
     </BrowserRouter>
    </BikesProvider>
    </>
  )
}