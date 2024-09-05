import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { children } from 'react';
import { Cart } from "./pages/cart/cart";
import { Shop } from "./pages/shop/shop";
import { ShopContextProvider } from "./context/shop-context";
import Login from './components/Login'
import Register from "./components/Register";
import RootLayout from "./components/RootLayout";
import Home from "./pages/home/Home";
import ErrorPage from "./SpecialSetups/ErrorPage";
import VideoUpload from "./components/VideoUpload";
import DataProtectionPolicy from "./pages/DataProtection";
import Contact from "./pages/contact/contact";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import UploadProducts from "./components/UploadProducts";
import AlterProducts from "./components/AlterProducts";
import PaymentSuccess from "./Payments/PaymentSuccess";
import PaymentCancel from "./Payments/PaymentCancel";
import PaymentNotify from "./Payments/PaymentNotify";



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'video-upload', element: <VideoUpload /> },
      { path: 'data-protection', element: <DataProtectionPolicy /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms-of-service', element: <TermsOfService /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'upload-products', element: <UploadProducts /> },
      { path: 'alter-products', element: <AlterProducts /> },
      { path: '/payment-success', element: <PaymentSuccess /> },
      { path: '/payment-cancel', element: <PaymentCancel /> },
      { path: '/payment-notify', element: <PaymentNotify /> },



    ]
  }
])


function App() {
  return (


    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>



  );
}

export default App;
