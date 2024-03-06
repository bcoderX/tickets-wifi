'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useInfiniteOffsetPaginationQuery, useInsertMutation } from "@supabase-cache-helpers/postgrest-swr";
export default function AddPricing() {

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
    wifiZone: "",
    name: "",
    description: "",
    price: 0,
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


  const {
    currentPage,
  } = useInfiniteOffsetPaginationQuery(
    supabase
      .from("wifi_zones")
      .select("id, name, description, dns, email, router_system", { count: "exact" })
      .order("id", { ascending: true }),
    { revalidateOnReconnect: true }
  )


  //Trigger insert for pricings
  const { trigger: insert, isMutating } = useInsertMutation(
    supabase.from("pricings"),
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
          wifiZone: "",
          name: "",
          description: "",
          price: 0,
        });
        if (once) {
          router.push("/dashboard/pricing/list");
        }
      }
    }
  );

  // Function to create an account
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
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
            wifi_zone: state.wifiZone,
            name: state.name,
            description: state.description,
            price: state.price,
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

      {/* Main content */}
      <section className="content">

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 ">
              {/* Default box */}
              {/* jquery validation */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Nouveau tarif</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onSubmit={handleAdd} role="form" id="quickForm">
                  
                  <div className="card-body">
                  {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}.</p> : null}
                                    {success ? <p className="alert alert-success p-2">Ajouté avec succès</p> : null}
                    <div className="form-group">
                      <label htmlFor="wifiZone">Quel Wifi-Zone ?</label>
                      <select onChange={handleChange} value={state.wifiZone} name="wifiZone" id="wifiZone" className="form-control select2" style={{ width: "100%" }} required>
                      <option value="">----</option>
                        {
                          currentPage ? currentPage.map((value) => {
                            return <option value={value.id}>{value.name}</option>
                          }) : null
                        }
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Désignation</label>
                      <input onChange={handleChange} value={state.name} name="name" type="text" className="form-control" id="name" placeholder="EX: 1 Journée &agrave; 200 F" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input onChange={handleChange} value={state.description} name="description" type="text" className="form-control" id="description" placeholder="EX: Utiliser le wifi gratuitement pendent 24h" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Prix(CFA)</label>
                      <input onChange={handleChange} value={state.price} name="price" type="number" className="form-control" id="price" placeholder="EX: 200" required />
                    </div>
                  </div>

                  {/* /.card-body */}
                  <div className="card-footer py-3">
                    <button type="submit" className={"btn btn-primary mr-3 " + (isLoading ? "disabled" : "")} onClick={() => { setOnce(true) }}>
                      Ajouter
                      {
                        isLoading && once ?
                          <div style={{height: 15, width: 15}} className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div> : null
                      }</button>
                    <button type="submit" className={"btn btn-primary mr-3 " + (isLoading ? "disabled" : "")} onClick={() => { setOnce(false) }} >
                      Ajouter et enregistrer un autre
                      {
                        isLoading && !once ?
                          <div style={{height: 15, width: 15}} className="spinner-border" role="status">
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
      {/* /.content */}
    </div>
  );
}