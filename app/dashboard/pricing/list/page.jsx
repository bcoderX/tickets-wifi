'use client'
import { useInfiniteOffsetPaginationQuery } from "@supabase-cache-helpers/postgrest-swr";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react"

export default function PricingList(props) {
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
            .from("pricings")
            .select("wifi_zones(name), name, description, price", { count: "exact" })
            .ilike("wifi_zones.name", `%${state.wifiZone}%`,)
            .or(`name.ilike.%${state.searchTerm}%, description.ilike.%${state.searchTerm}%, price.ilike.%${state.searchTerm}%`)
            .order("created_at", { ascending: true }),
        { pageSize: state.pageSize, revalidateOnReconnect: true }
    )
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6 col-md-9">
                            <h1>Liste ds tarifs</h1>
                        </div>
                        <div className="col-sm-6 col-md-3">
                        <select onChange={handleChange} value={state.wifiZone} name="wifiZone" id="wifiZone" className="form-control select2 float-sm-right" style={{ width: "100%" }} required>
                      <option value="">Tous</option>
                        {
                          currentWifiZonePage ? currentWifiZonePage.map((value) => {
                            return <option key={value.id} value={value.name}>{value.name}</option>
                          }) : null
                        }
                      </select>
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
                            <a href="./add" className="btn btn-lg btn-primary">Ajouter nouveau</a>
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
                                                    <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Désignation: activate to sort column descending">Désignation</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Prix: activate to sort column ascending">Prix</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Wifi-Zone: activate to sort column ascending">Wifi-Zone</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Description: activate to sort column ascending">Description</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Actions: activate to sort column ascending">Actions</th></tr>
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
                                                                    <tr key={value.name+value.wifi_zones.name} role="row" className="odd">
                                                                        <td tabIndex={0}>
                                                                            {value.name}
                                                                        </td>
                                                                        <td>{value.price}</td>
                                                                        <td>{value.wifi_zones.name}</td>
                                                                        <td className="">{value.description}</td>
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
                                            Affichage de {pageIndex && pages ? pages.length >= 1 ? pageIndex + 1 : 0 : 0} &agrave; {pageIndex != null && pages ? pages.length >= 1 ? (pageIndex * state.pageSize) + 1 : 0 : 0} sur {pages != null && currentPage ? pages.length > 1 && currentPage.length > 10 ? pages.length * state.pageSize : currentPage.length : 0} éléments</div>
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                            <ul className="pagination">
                                                <li onClick={previousPage ? previousPage : () => { }} className={"paginate_button page-item previous " + (pages && pages.length > 1 && currentPage && pageIndex > 0 ? "" : "disabled")}
                                                    id="example2_previous">
                                                    <a href="#" aria-controls="example2" data-dt-idx="0"
                                                        tabIndex={0} className="page-link">Previous</a></li>
                                                {
                                                    pages && currentPage ?
                                                        currentPage.length == 0 ? null :
                                                            pages.map((value, index) => {
                                                                return (
                                                                    <li key={index} onClick={setPage ? () => setPage(index) : () => { }} className={"paginate_button page-item " + (pageIndex == index ? "active" : "")}><a href="#"
                                                                        aria-controls="example2" data-dt-idx="1" tabIndex={0}
                                                                        className="page-link">{index + 1}</a></li>
                                                                )
                                                            })
                                                        : null
                                                }
                                                <li onClick={nextPage ? nextPage : () => { }} className={"paginate_button page-item next " + (pages && currentPage ? pages.length > 1 && currentPage.length > 10 ? pageIndex + 1 == (pages.length / state.pageSize) ? "disabled" : "" : "disabled" : "disabled")} id="example2_next"><a
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