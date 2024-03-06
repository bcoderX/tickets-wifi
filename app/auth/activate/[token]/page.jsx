'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isAuthRetryableFetchError, isAuthApiError, AuthInvalidCredentialsError } from "@supabase/supabase-js";

export default function RecoverPassword() {

  const supabase = createClientComponentClient();
  const params = useParams();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async ()=>{
      const { data, error } = await supabase.auth.getSession();
      if (data.session != null) {
          router.push("/dashboard");
      }
  });
   supabase.auth.verifyOtp({
    token_hash: params["token"],
    type: 'signup',
    options:{
      redirectTo: "/dashboard"
    }
    
  }).then((value)=>{
    const { data, error } = value;
    // Handle any errors.
  if (error) {
    
    if (isAuthRetryableFetchError(error)) {
      setErrorStatus((prev) => {
        return {
          expired: false,
          hasError: true,
          errorMessage: "Problème de connexion"
        }
      })
    } else if (error instanceof AuthInvalidCredentialsError) {
      setErrorStatus( {
          hasError: true,
          errorMessage: "Email ou mot de passe incorrect"
      })
    } else if (isAuthApiError(error)) {
      setErrorStatus({
        expired: true,
          hasError: true,
          errorMessage: "Code expiré ou invalide"
      })
    }
    setIsLoading(false);
  } else {
    setSuccess(true);
  }
  })

  },[])

  const [state, setState] = useState({
    code: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    expired: false,
    hasError: false,
    errorMessage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setState((prev) => {
      return { ...prev, [key]: value };
    })
  };



  // Function to create an account
  const handleSignIn = async (e) => {
    e.preventDefault()
    
    setIsLoading(true);
    try {
      // Insert the new item, providing the item name. The rest gets
      // filled in automatically.
      await supabase.auth.verifyOtp({
        email: state.email,
        token: state.code,
        type: 'signup',
        options:{
          redirectTo: "/dashboard"
        }
        
      }).then((value)=>{
        const { data, error } = value;
        // Handle any errors.
      if (error) {

        if (isAuthRetryableFetchError(error)) {
          setErrorStatus((prev) => {
            return {
              expired: false,
              hasError: true,
              errorMessage: "Problème de connexion"
            }
          })
        } else if (error instanceof AuthInvalidCredentialsError) {
          setErrorStatus( {
              hasError: true,
              errorMessage: "Email ou mot de passe incorrect"
          })
        } else if (isAuthApiError(error)) {
          setErrorStatus({
              hasError: true,
              errorMessage: "Code expiré ou invalide"
          })
        }
        setIsLoading(false);
      } else {
        setSuccess(true);
      }
      })

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }


  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>Latouch</b> Numeric</a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Activer votre compte.</p>
            {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}. {errorStatus.expired ?<Link className="text-danger" href={"/auth/resend-confirmation"}>Renvoyer</Link>:null} </p> : null}
            <p className="alert alert-success p-2">V&eacute;rifier votre boite mail</p>
            <form onSubmit={handleSignIn} method="post">
            <div className="input-group mb-3">
                <input onChange={handleChange} name="email" value={state.email}  type="email" className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input onChange={handleChange} name="code" value={state.code} type="number" className="form-control" placeholder="Code" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">Valider</button>
                </div>
                {/* /.col */}
              </div>
            </form>

            <p className="mt-3 mb-1">
              <Link href={"./login"}>Se connecter</Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      {/* /.login-box */}

      {/* jQuery */}
      <script src="../../plugins/jquery/jquery.min.js"></script>
      {/* AdminLTE App */}
      <script src="../../dist/js/adminlte.min.js"></script>

    </body>
  );
  }
