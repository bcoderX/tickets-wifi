import React from "react";

export default function ReportIncome() {
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Recettes</h1>
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
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">Paramètres de recherches</div>
                                <div className="card-body">
                                    <h3>Ventes du jour</h3>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Date de début</label>
                                                        <input type="date" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Date de fin</label>
                                                        <input type="date" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Wifizone</label>
                                                        <select className="form-control select2" style={{ width: "100%" }}>
                                                            <option selected>MICROTIK</option>
                                                            <option>SECOND</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Date de fin</label>
                                                        <button className="btn btn-success form-control">Rechercher</button>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Imprimer</label>
                                                        <button className="btn btn-primary form-control">Imprimer</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3>Totaux</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content card pt-3 pb-3 bg-white">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 ">
                            {/* Default box */}
                            <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"><div id="example2_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example2" /></label></div></div></div><div className="row"><div className="col-sm-12"><table id="example2" className="table table-bordered table-striped dataTable no-footer dtr-inline" role="grid" aria-describedby="example2_info">
                                <thead>
                                    <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Date: activate to sort column descending">Date</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Wifizone: activate to sort column ascending">Wifizone</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Montant: activate to sort column ascending">Montant</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Réseau: activate to sort column ascending">Réseau</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Référence: activate to sort column ascending">Référence</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Username: activate to sort column ascending">Username</th><th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Password: activate to sort column ascending">Password</th></tr>
                                </thead>
                                <tbody>



                                    <tr role="row" className="odd">
                                        <td tabIndex={0} className="sorting_1">Trident</td>
                                        <td>Internet
                                            Explorer 5.5
                                        </td>
                                        <td>Win 95+</td>
                                        <td>5.5</td>
                                        <td>5.5</td>
                                        <td>5.5</td>
                                        <td>5.5</td>

                                    </tr><tr role="row" className="even">
                                        <td tabIndex={0} className="sorting_1">Trident</td>
                                        <td>Internet
                                            Explorer 6
                                        </td>
                                        <td>Win 98+</td>
                                        <td>6</td>
                                        <td>6</td>
                                        <td>6</td>
                                        <td>6</td>
                                    </tr></tbody>
                            </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="example2_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="example2_previous"><a href="#" aria-controls="example2" data-dt-idx="0" tabIndex={0} className="page-link">Previous</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1" tabIndex={0} className="page-link">1</a></li><li className="paginate_button page-item next disabled" id="example2_next"><a href="#" aria-controls="example2" data-dt-idx="2" tabIndex={0} className="page-link">Next</a></li></ul></div></div></div></div>
                            {/* /.table */}
                        </div>
                    </div>
                </div>
            </section>
            {/* /.content */}
        </div>
    );
}