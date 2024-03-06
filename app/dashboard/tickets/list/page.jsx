'use client'
import { useInfiniteOffsetPaginationQuery } from "@supabase-cache-helpers/postgrest-swr";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react"
export default function TicketsList(){

    const supabase = createClientComponentClient();
    const [state, setState] = useState({
        pageSize: 12,
        searchTerm: "",
        wifiZone: ""
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setState((prev) => {
            return { ...prev, [key]: value };
        })
    };

    const {
        currentPage: currentWifiZonePage,
      } = useInfiniteOffsetPaginationQuery(
        supabase
          .from("wifi_zones")
          .select("id, name, description, dns, email, router_system", { count: "exact" })
          .order("id", { ascending: true }),
        { revalidateOnReconnect: true }
      )

    const {
        currentPage,
        nextPage,
        previousPage,
        setPage,
        pages,
        pageIndex,
        isValidating,
        error,
    } = useInfiniteOffsetPaginationQuery(
        supabase
            .from("tickets")
            .select("wifi_zones(name), pricings(name), username, password, is_paid", { count: "exact" })
            .ilike("wifi_zones.name", `%${state.wifiZone}%`,)
            .or(`username.ilike.%${state.searchTerm}%, password.ilike.%${state.searchTerm}%`)
            .order("created_at", { ascending: true }),
        { pageSize: state.pageSize, revalidateOnReconnect: true }
    )

    return (
        <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Mes tickets</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item active">Tous</li>
                    </ol>
                </div>
            </div>
        </div>{/* /.container-fluid */}
    </section>

    {/* Main content */}
    <section className="content card pt-3 pb-3 bg-white">

        <div className="container-fluid">
            <div className="row">
                <div className="col-12 ">
                    {/* Default box */}
                    <a href="./add-tickets.html" className="btn btn-lg btn-primary">Ajouter nouveaux</a>
                    <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="mt-3">

                                            <label>Montrer:<input style={{maxWidth:"50px"}}
                                                onChange={handleChange} name="pageSize" value={state.pageSize}
                                                type="number" className="ml-3" placeholder=""
                                                aria-controls="example2" />éléments</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div id="example2_filter" className="dataTables_filter">
                                            <label>Rechercher:
                                                <input
                                                    onChange={handleChange} name="searchTerm" value={state.searchTerm}
                                                    type="search" className="form-control form-control-sm" placeholder=""
                                                    aria-controls="example2" /></label></div>
                                    </div>
                                </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="example2" className="table table-bordered table-striped dataTable no-footer dtr-inline" role="grid" aria-describedby="example2_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Utilisateurs: activate to sort column descending">Utilisateurs</th>
                                            <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Mot de passe: activate to sort column ascending">Mot de passe</th>
                                            <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Tarif: activate to sort column ascending">Tarif</th>
                                            <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Etat: activate to sort column ascending">Etat</th>
                                            <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Actions: activate to sort column ascending">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                                {
                                                    currentPage != null ?


                                                        currentPage.length == 0 ?
                                                            (
                                                                <tr>
                                                                    <td style={{ textAlign: "center" }} colSpan={7}>Vide</td>
                                                                </tr>
                                                            ) :
                                                            currentPage.map((value, index) => {
                                                                return (
                                                                    <tr role="row" className="odd">

                                                                        <td tabIndex={0}>
                                                                            {value.username}
                                                                        </td>
                                                                        <td>{value.password}</td>
                                                                        <td>{value.pricings.name}</td>
                                                                        <td className="">{value.is_paid ? "Ancien" : "Nouveau"}</td>
                                                                        <td className="text-center">
                                                                            <span
                                                                                className="mt-3 mb-3 ml-3 pl-2 pr-1 pt-1 pb-1 border border-primary rounded ">
                                                                                <i className="fas fa-edit text-primary"></i>
                                                                            </span>
                                                                            <span
                                                                                className="mt-3 mb-3 ml-1 mr-3 pl-2 pr-2 pt-1 pb-1 border border-danger rounded ">
                                                                                <i className="fas fa-trash text-danger"></i>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        : null}

                                            </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                                    <div className="col-sm-12 col-md-5">
                                        <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
                                            Affichage de { pages ? pages.length==1 ? 1:  (pageIndex) * currentPage.length : 0} &agrave; { pages ? pages.length<=1 ? currentPage.length: ((pageIndex+1) * currentPage.length) : 0} sur {pages != null && currentPage ? pages.length > 1 && currentPage.length > 10 ? pages.length * state.pageSize : currentPage.length : 0} éléments</div>
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                            <ul className="pagination">
                                                <li onClick={previousPage ? previousPage : () => { }} className={"paginate_button page-item previous " + (previousPage ? "" : "disabled")}
                                                    id="example2_previous">
                                                    <a href="#" aria-controls="example2" data-dt-idx="0"
                                                        tabIndex={0} className="page-link">Previous</a></li>
                                                
                                                <li onClick={nextPage ? nextPage : () => { }} className={"paginate_button page-item next " +(nextPage ? "" : "disabled" )} id="example2_next"><a
                                                    href="#" aria-controls="example2" data-dt-idx="2" tabIndex={0}
                                                    className="page-link">Next</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    {/* /.table */}
                </div>
            </div>
        </div>
    </section>
    {/* /.content */}
</div>
    );
}