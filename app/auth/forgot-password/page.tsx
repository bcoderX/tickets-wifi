'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isAuthRetryableFetchError, isAuthApiError, AuthInvalidCredentialsError } from "@supabase/supabase-js";

export default function ForgotPassword() {

  const supabase = createClientComponentClient();

  const [state, setState] = useState({
    email: "",
  });

  const [success, setSuccess] = useState(false);
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

  // Function to create an account
  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true);
    
    try {
      // Insert the new item, providing the item name. The rest gets
      // filled in automatically.
      await supabase.auth.resetPasswordForEmail(state.email).then((value)=>{
        const { data, error } = value;
        // Handle any errors.
      if (error) {

        if (isAuthRetryableFetchError(error)) {
          setErrorStatus((prev: any) => {
            return {
              accountInactive: false,
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
          
          setErrorStatus( {
              hasError: true,
              errorMessage: "Email invalid"
          })
        }
        setIsLoading(false);
      } else {
        setSuccess(true);
        setIsLoading(false);
        // router.push("/auth/activate");
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
            <p className="login-box-msg">Saisir votre email.</p>
            {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}.</p> : null}
            {success ? <p className="alert alert-success p-2">V&eacute;rifier votre boite mail</p> : null}
            <form onSubmit={handleResend} method="post">
              <div className="input-group mb-3">
                <input onChange={handleChange} name="email" value={state.email} type="email" className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                <button disabled={isLoading} type="submit" className="btn btn-primary btn-block text-center">
                  {
                    isLoading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : "Valider"
                  }
                </button>
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

