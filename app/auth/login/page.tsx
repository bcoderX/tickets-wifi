'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isAuthRetryableFetchError, isAuthApiError, AuthInvalidCredentialsError } from "@supabase/supabase-js";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async ()=>{
      const { data, error } = await supabase.auth.getSession();
      if (data.session != null) {
          router.push("/dashboard");
      }
  });
  },['router', 'supabase.auth'])

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    accountInactive: false,
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
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true);
    try {
      // Insert the new item, providing the item name. The rest gets
      // filled in automatically.
      await supabase.auth.signInWithPassword(
        {
          email: state.email,
          password: state.password,
        }
      ).then((value)=>{
        let { data, error } = value;
        if (data.session !=null) {
          router.push("/dashboard");
        }
  
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
              accountInactive: false,
                hasError: true,
                errorMessage: "Email ou mot de passe incorrect"
            })
          } else if (isAuthApiError(error)) {
            if(error.message == "Email not confirmed"){
              setErrorStatus( {
                accountInactive: true,
                hasError: true,
                errorMessage: "Votre compte n'est pas activé"
            })
            }else{
            setErrorStatus( {
              accountInactive: false,
                hasError: true,
                errorMessage: "Email ou mot de passe incorrect"
            })
          }
          }
          setIsLoading(false);
        } else {
          router.refresh();
        }
      });
      

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/"><b>Latouch</b> Numeric</a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Se connecter</p>
            {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}. {errorStatus.accountInactive ?<Link className="text-danger" href={"/auth/resend-confirmation"}>Activer</Link>:null} </p> : null}

            <form onSubmit={handleSignIn} method="post">
              <div className="input-group mb-3">
                <input onChange={handleChange} name="email" value={state.email} type="email" className="form-control" placeholder="Email" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input onChange={handleChange} name="password" value={state.password} type="password" className="form-control" placeholder="Mot de passe" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="icheck-primary cursor-pointer">
                <input onChange={() => setAgree(!agree)} name="acceptConditions" type="checkbox" id="agreeTerms" required  />
                <label className="ml-3" htmlFor="agreeTerms">
                  J&#39;accepte les <a href="#">conditions</a>
                </label>
              </div>

              <div>

                <button disabled={isLoading} type="submit" className="btn btn-primary btn-block text-center">
                  {
                    isLoading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : "Se connecter"
                  }
                </button>
              </div>
            </form>


            <p className="mb-1 mt-2 text-center">
              <Link href={"./forgot-password"}>Mot de passe oubli&eacute;</Link>
            </p>
            <p className="mb-0 mt-1 text-center">
              <Link href={"./sign-up"} className="text-center">S&#39;inscrire</Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      {/* /.login-box */}

      {/* jQuery */}
      <script src="../../plugins/jquery/jquery.min.js" defer></script>
      {/* AdminLTE App */}
      <script src="../../dist/js/adminlte.min.js" defer></script>

    </body>
  );
}