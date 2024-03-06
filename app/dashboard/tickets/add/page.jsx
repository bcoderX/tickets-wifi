'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useInfiniteOffsetPaginationQuery, useInsertMutation } from "@supabase-cache-helpers/postgrest-swr";
import Papa from "papaparse";

export default function AddTickect() {
    let session = null;
    useEffect(() => {
        supabase.auth.onAuthStateChange(async () => {
            const { data, error } = await supabase.auth.getSession();
            session = data.session;
        });
    });
    const supabase = createClientComponentClient();
    const [state, setState] = useState({
        wifiZone: "",
        pricing: "",
        ticketType: "",
    });


    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [errorStatus, setErrorStatus] = useState({
        hasError: false,
        errorMessage: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const key = e.target.name;
        if (key == "wifiZone") {
            setState(prev => {
                return {
                    ...prev,
                    pricing: "",
                }
            })
        }
        const value = e.target.value;
        setState((prev) => {
            return { ...prev, [key]: value };
        })
    };

    const [filePath, setFilePath] = useState("Choisir le fichier .csv");

    const handlePreview = () => {

        const inputElement = document.querySelector("#exampleInputFile");

        if (inputElement) {

            if (inputElement.files.length > 0) {

                Papa.parse(inputElement.files[0], {
                    header: true,
                    complete: (result, file) => {
                        if (result.errors.length > 0) {
                            setErrorStatus({
                                hasError: true,
                                errorMessage: "Impossible de charger le fichier",
                            })
                        }
                        else if (result.data) {
                            setData(result.data);
                            console.log(data);
                            setIsPreview(true);
                        }

                    }
                })
            }
        }

    };


    const {
        currentPage: wifiList,
    } = useInfiniteOffsetPaginationQuery(
        supabase
            .from("wifi_zones")
            .select("id, name", { count: "exact" })
            .order("created_at", { ascending: true }),
        { revalidateOnReconnect: true }
    );

    const {
        currentPage: pricingList,
    } = useInfiniteOffsetPaginationQuery(
        supabase
            .from("pricings")
            .select("id, name", { count: "exact" })
            .match({ "wifi_zone": state.wifiZone })
            .order("created_at", { ascending: true }),
        { revalidateOnReconnect: true }
    );

    const {
        currentPage: ticketTypeList,
    } = useInfiniteOffsetPaginationQuery(
        supabase
            .from("ticket_types")
            .select("id, name", { count: "exact" })
            .order("created_at", { ascending: true }),
    );



    //Trigger insert for pricings
    const { trigger: insert, isMutating } = useInsertMutation(
        supabase.from("tickets"),
        ["id",],
        null,
        {
            onError: (error) => {
                setIsLoading(false)
                setErrorStatus({
                    hasError: true,
                    errorMessage: "Echec de l'enregistrement",
                })
            },
            onSuccess: () => {
                setSuccess(true);
                setIsLoading(false);
                setState({
                    wifiZone: "",
                    pricing: "",
                    ticketType: "",
                });

                router.push("/dashboard/tickets/list");
            }
        }
    );

    // Function to create an account
    const handleAdd = async (e) => {
        e.preventDefault()
        setIsPreview(false);
        setErrorStatus((prev) => {
            return {
                hasError: false,
                errorMessage: "",
            }
        })
        setSuccess(false);
        setIsLoading(true);
        try {
            // Insert the new item, providing the item name. The rest gets
            // filled in automatically.
            insert(
                [
                    ...data.map((ticket) => {
                        return {
                            created_by: session?.user.id,
                            wifi_zone: state.wifiZone,
                            pricing: state.pricing,
                            ticket_type: state.ticketType,
                            username: ticket.Username,
                            password: ticket.Password
                        }
                    })

                ]
            )


        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Ajouter</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Ajouter</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className={"content " + (isPreview ? "card" : "")}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {/* Default box */}
                            {/* jquery validation */}
                            {isPreview ?

                                <>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h1 className="mt-3">Aperçu</h1>
                                        </div>
                                        <div className="col-sm-6">
                                            <a href="#" onClick={handleAdd} className="mt-3 float-sm-right btn btn-lg btn-primary">Valider</a>
                                            <a href="#" onClick={() => setIsPreview(false)} className="mt-3 mr-3 float-sm-right btn btn-lg btn-danger">Annuler</a>

                                        </div>
                                    </div>

                                    <table id="example2" className="table table-bordered table-striped dataTable no-footer dtr-inline" role="grid" aria-describedby="example2_info">
                                        <thead>
                                            <tr role="row">
                                                {
                                                    data.length > 0 ? Object.keys(data[0]).map((value, index) => {
                                                        return <th key={value} className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Utilisateurs: activate to sort column descending">{value}</th>
                                                    }) : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length > 0 ? data.map((value, index) => {
                                                    return <tr key={index+"tickets"} role="row" className="odd">
                                                        {
                                                            Object.values(value).map((val) => {
                                                                return <td key={value} >{val}</td>
                                                            })
                                                        }
                                                    </tr>
                                                }) : null
                                            }

                                        </tbody>
                                    </table>
                                </>
                                : <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Importations de tickets</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={(e) => e.preventDefault()} role="form" id="quickForm">
                                        <div className="card-body">
                                            {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}.</p> : null}
                                            {success ? <p className="alert alert-success p-2">Ajouté avec succès</p> : null}
                                            <div className="form-group">
                                                <label htmlFor="wifiZone">Quel Wifi-Zone ?</label>
                                                <select onChange={handleChange} value={state.wifiZone} name="wifiZone" id="wifiZone" className="form-control select2" style={{ width: "100%" }} required>
                                                    <option value="">----</option>
                                                    {
                                                        wifiList ? wifiList.map((value) => {
                                                            return <option key={value.id} value={value.id}>{value.name}</option>
                                                        }) : null
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pricing">Sélectionner un tarif</label>
                                                <select onChange={handleChange} value={state.pricing} name="pricing" id="pricing" className="form-control select2" style={{ width: "100%" }} required>
                                                    <option value="">----</option>
                                                    {
                                                        pricingList ? pricingList.map((value) => {
                                                            return <option key={value.id} value={value.id}>{value.name}</option>
                                                        }) : null
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="ticketType">Sélectionner le type de ticket</label>
                                                <select onChange={handleChange} value={state.ticketType} name="ticketType" id="ticketType" className="form-control select2" style={{ width: "100%" }} required>
                                                    <option value="">----</option>
                                                    {
                                                        ticketTypeList ? ticketTypeList.map((value) => {
                                                            return <option key={value.id} value={value.id}>{value.name}</option>
                                                        }) : null
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputFile">Sélectionner le fichier</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <input onChange={(e) => {
                                                            if (e.target.files) {
                                                                setFilePath(e.target.files[0].name);
                                                            }
                                                        }} type="file" className="custom-file-input" id="exampleInputFile" required />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">{filePath}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" onClick={handlePreview} className="btn btn-primary">Importer
                                                {
                                                    isLoading ?
                                                        <div style={{ height: 15, width: 15 }} className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : null
                                                }</button>
                                        </div>
                                    </form>
                                </div>
                            }
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </section>
            {/* /.content */}
        </div>
    );
}