'use client'
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import  { usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
export default function RouteLayout({children}:{children: React.ReactNode}){
    const router = useRouter();
    const path = usePathname();
    const supabase = createClientComponentClient();
    let session: Session | null=null;
     const [userName, setUsername] = useState("----");
    
    const logout = async ()=>{
        supabase.auth.signOut()
        router.push("/auth/login")
    }

    useEffect(()=>{
        supabase.auth.onAuthStateChange(async ()=>{
            const { data, error } = await supabase.auth.getSession();
            session=data.session;
            if (data.session == null) {
                router.push("/auth/login");
            }
            else{
               setUsername( session?.user.user_metadata["full_name"])
            }
        });
    })


    return (

<body className="hold-transition sidebar-mini layout-fixed">
<div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
            </ul>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <a className="nav-link"  href="#" role="button">
                        <i className="fas fa-search"></i>
                    </a>
                </li>
            </ul>
        </nav>
        {/* /.navbar */}

        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="" className="brand-link">
                <Image width={50} height={50} src="/images/LogoMark.png" alt="Latouch Numeric Logo"
                    className="brand-image  bg-white img-circle elevation-3" style={{opacity: ".8"}} />
                <span className="brand-text font-weight-light">Latouch Numeric</span>
            </a>

            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">

                        <div style={{width:30,height:30}} className="img-circle elevation-2 text-center text-white text-lg">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{userName}</a>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon className
           with font-awesome or any other icon font library */}
                        <li className="nav-item">
                            <a href="/dashboard" className={"nav-link "+(path.endsWith("/dashboard") || path.endsWith("/dashboard/")? "active":"")}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </a>
                        </li>
                        <li className={"nav-item has-treeview " + (path.includes("/dashboard/wifi-zones") ? "menu-open":"")}>
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-wifi"></i>
                                <p>
                                    Wifi zones
                                    <i className="fas fa-angle-left right"></i>
                                    <span className="badge badge-info right">6</span>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link href="/dashboard/wifi-zones/add" className={"nav-link "+(path.includes("/dashboard/wifi-zones/add") ? "active":"")}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Nouveau</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/wifi-zones/list" className={"nav-link "+ (path.includes("/dashboard/wifi-zones/list") ? "active":"")}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Mes wifi zones</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    <li className={"nav-item has-treeview " +(path.includes("/dashboard/pricing") ? "menu-open":"")}>
                        <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-dollar-sign"></i>
                            <p>
                                Tarifs
                                <i className="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <Link href="/dashboard/pricing/add" className={"nav-link "+(path.includes("/dashboard/pricing/add") ? "active":"")}>
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Nouveau</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/dashboard/pricing/list" className={"nav-link "+(path.includes("/dashboard/pricing/list") ? "active":"")}>
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Mes tarifs</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={"nav-item has-treeview "+(path.includes("/dashboard/tickets") ? "menu-open":"")}>
                        <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-money-check-alt"></i>
                            <p>
                                Tickets
                                <i className="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <a href="/dashboard/tickets/add" className={"nav-link "+(path.includes("/dashboard/tickets/add") ? "active":"")}>
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Nouveau</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/dashboard/tickets/list" className={"nav-link "+(path.includes("/dashboard/tickets/list") ? "active":"")}>
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Mes tickets</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={"nav-item has-treeview "+(path.includes("/dashboard/reports") ? "menu-open":"")}>
                        <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-chart-pie"></i>
                            <p>
                                Rapports
                                <i className="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <a href="/dashboard/reports/income" className={"nav-link "+(path.includes("/dashboard/reports/income") ? "active":"")}>
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Recettes</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a onClick={logout} href="#" className="nav-link">
                            <i className="nav-icon fas fa-sign-out-alt"></i>
                            <p>
                                Déconnexion
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
            {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
</aside>
{children}
{/* /.content-wrapper */}
    <footer className="main-footer">
      <strong>Copyright &copy; 2023 <a href="#">Latouch Numeric</a>.</strong>
      Tous droits réservés.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0
      </div>
    </footer>

    {/* Control Sidebar */}
    <aside className="control-sidebar control-sidebar-dark">
      {/* Control sidebar content goes here */}
    </aside>
    {/* /.control-sidebar */}
  </div>
{/* jQuery */ }
<script src="/plugins/jquery/jquery.min.js" defer></script>

{/* <Format /> */}
{/* AdminLTE App */ }
<script src="/dist/js/adminlte.js" defer></script>

{/* page script */ }
</body >
   );
}