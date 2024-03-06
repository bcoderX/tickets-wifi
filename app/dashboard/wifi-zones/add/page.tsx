'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useInsertMutation } from "@supabase-cache-helpers/postgrest-swr";

export default function AddWifiZone() {
    let session: Session | null = null;
    const [userName, setUsername] = useState("----");

    useEffect(() => {
        supabase.auth.onAuthStateChange(async () => {
            const { data, error } = await supabase.auth.getSession();
            session = data.session;
        });
    })
    const supabase = createClientComponentClient();
    const [state, setState] = useState({
        name: "",
        description: "",
        dns: "",
        email: "",
        router_system: "MICROTIK"
    });

    const [success, setSuccess] = useState(false);
    const [once, setOnce] = useState(false);
    const [errorStatus, setErrorStatus] = useState({
        hasError: false,
        errorMessage: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: any) => {
        const key = e.target.name;
        const value = e.target.value;
        setState((prev: any) => {
            return { ...prev, [key]: value };
        })
    };

    const { trigger: insert, isMutating } = useInsertMutation(
        supabase.from("wifi_zones"),
        ["id",],
        null,
        {
            onError: (error) => {
                setIsLoading(false)
                setErrorStatus((prev: any) => {
                    return {
                        hasError: true,
                        errorMessage: "Echec de l'enregistrement",
                    }
                })
            },
            onSuccess: () => {
                setSuccess(true);
                setIsLoading(false);
                setState({
                    name: "",
                    description: "",
                    dns: "",
                    email: "",
                    router_system: "MICROTIK"
                });
                if (once) {
                    router.push("/dashboard/wifi-zones/list");
                }
            }
        }
    );

    // Function to create an account
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorStatus((prev: any) => {
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
                    {
                        created_by: session?.user.id,
                        name: state.name,
                        description: state.description,
                        dns: state.dns,
                        email: state.email,
                        router_system: state.router_system,
                    }
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

            <section className="content">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 ">
                            {/* Default box */}
                            {/* jquery validation */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Nouveau Wifi-Zone</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleAdd} role="form" id="quickForm">
                                    
                                    <div className="card-body">
                                    {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}.</p> : null}
                                    {success ? <p className="alert alert-success p-2">Ajouté avec succès</p> : null}
                                        <div className="form-group">
                                            <label htmlFor="name">Nom du Wifizone</label>
                                            <input onChange={handleChange} value={state.name} type="text" name="name" className="form-control" id="name" placeholder="EX: STMS WIFI HD" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <input onChange={handleChange} value={state.description} type="text" name="description" className="form-control" id="description" placeholder="EX: LE MEILLEUR DE LA ZONE" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dns">Nom de domaine (DNS)</label>
                                            <input onChange={handleChange} value={state.dns} type="text" name="dns" className="form-control" id="dns" placeholder="EX: http://stmskdg.net" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                                </div>
                                                <input onChange={handleChange} value={state.email} id="email" name="email" type="email" className="form-control" placeholder="email@example.com" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="system">Système de gestion du Wifizone</label>
                                            <select onChange={handleChange} value={state.router_system} name="router_system" id="system" className="form-control select2" style={{ width: "100%;" }} required>
                                                <option value={"MICROTIK"}>MICROTIK</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer py-3">
                                        <button type="submit" className={"btn btn-primary mr-3 " + (isLoading ? "disabled" : "")} onClick={() => { setOnce(true) }}>
                                            Ajouter
                                            {
                                                isLoading && once ?
                                                    <div style={{ height: 15, width: 15 }} className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : null
                                            }</button>
                                        <button type="submit" className={"btn btn-primary mr-3 " + (isLoading ? "disabled" : "")} onClick={() => { setOnce(false) }} >
                                            Ajouter et enregistrer un autre
                                            {
                                                isLoading && !once ?
                                                    <div style={{ height: 15, width: 15 }} className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : null
                                            }
                                        </button>
                                        <button type="button" className={"btn btn-primary " + (isLoading ? "disabled" : "")} onClick={(e) => { e.preventDefault(); router.back() }}>Annuler</button>
                                    </div>
                                </form>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}