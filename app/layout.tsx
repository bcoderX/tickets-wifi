import React from "react";
import './globals.css';

export default function RouteLayout({children}: {children: React.ReactNode}){
  
    return (

<html>
<head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <title>Latouch Numeric | Dashboard</title>
    {/* Tell the browser to be responsive to screen width */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* Font Awesome */}
    <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css" />
    {/* Ionicons */}
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
    {/* DataTables */}
    <link rel="stylesheet" href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css" />
    {/* Theme style */}
    <link rel="stylesheet" href="/dist/css/adminlte.min.css" />
    {/* Google Font: Source Sans Pro */}
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet" />

    {/* Landing page */}
    {/* Vendor CSS Files */}
  <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
  <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
  <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />

  {/* Template Main CSS File */}
  <link href="/assets/css/main.css" rel="stylesheet"/>
</head> 
{children}
</html >
    );
}