'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isAuthRetryableFetchError, isAuthApiError, isAuthWeakPasswordError } from "@supabase/supabase-js";

export default function Login(){
  const supabase = createClientComponentClient();
useEffect(()=>{
  supabase.auth.onAuthStateChange(async ()=>{
    const { data, error } = await supabase.auth.getSession();
    if (data.session != null) {
        router.push("/dashboard");
    }
});
}, [])

const [state, setState] = useState({
  email: "",
  fullName: "",
  password: "",
  confirmPassword: "",
});
const [success, setSuccess] = useState(false);
const [agree, setAgree]= useState(false);
const [errorStatus, setErrorStatus]= useState({
  hasError: false,
  errorMessage: "",
});
const [isLoading, setIsLoading]= useState(false);
const router  = useRouter();

const handleChange = (e: any) => {
  const key = e.target.name;
  const value = e.target.value;
  setState((prev:any) => {
    return { ...prev, [key]: value };
  })
};


  
  // Function to create an account
const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault()
  if (state.password != state.confirmPassword) {
    setErrorStatus((prev: any)=>{
      return {
        hasError: true,
        errorMessage: "Mots de passe non identiques"
      }
    })
    return
  }
  setErrorStatus((prev: any)=>{
    return {
      hasError: false,
      errorMessage: ""
    }
  })
  setIsLoading(true);
  try {
      // Insert the new item, providing the item name. The rest gets
      // filled in automatically.
      await supabase.auth.signUp(
        {
          email: state.email,
          password: state.password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
            data: {
              "full_name": state.fullName,
            }
          }
        }
      ).then((value)=>{
        let {data, error } = value;
        // Handle any errors.
      if (error) { 

        if (isAuthRetryableFetchError(error)) {
          setErrorStatus((prev: any)=>{
            return {
              hasError: true,
              errorMessage: "Problème de connexion"
            }
          })
        } else if (isAuthWeakPasswordError(error)) {
          setErrorStatus((prev: any)=>{
            return {
              hasError: true,
              errorMessage: "Mot de passe faible"
            }
          })
        } else if (isAuthApiError(error)) {
          setErrorStatus((prev: any)=>{
            return {
              hasError: true,
              errorMessage: "Une erreur inconne est survenue"
            }
          })
        }
        setIsLoading(false);
      } else {
        setSuccess(true);
        setIsLoading(false);
        router.refresh();
      }
      });

      

  } catch (error) {
     console.log(error);
     setIsLoading(false);
  }
}
    return (
        <body className="hold-transition register-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="/"><b>Latouch</b> Numeric</a>
          </div>
        
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">S&#39;inscrire </p>
              {errorStatus.hasError ? <p className="alert alert-danger p-2">{errorStatus.errorMessage}</p> :null}
              {success ? <p className="alert alert-success p-2">V&eacute;rifier votre boite mail</p> : null}
              <form  onSubmit={handleSignUp}>
                <div className="input-group mb-3">
                  <input onChange={handleChange} name="fullName" value={state.fullName} type="text" className="form-control" placeholder="Nom complet"required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input onChange={handleChange} name="email" value={state.email} type="email" className="form-control" placeholder="Email"required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input onChange={handleChange} name="password" value={state.password} type="password" className="form-control" placeholder="Mot de passe"required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input onChange={handleChange} name="confirmPassword" value={state.confirmPassword} type="password" className="form-control" placeholder="Confirmer mot de passe"required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                
                <div className="icheck-primary cursor-pointer">
                      <input onChange={()=>setAgree(!agree)} name="acceptConditions" type="checkbox" id="agreeTerms" required />
                      <label className="ml-3" htmlFor="agreeTerms">
                       J'accepte les <a href="#">conditions</a>
                      </label>
                    </div>
                    
                    <div>
                      
                    <button disabled={isLoading} type="submit" className="btn btn-primary btn-block text-center">
                      {
                        isLoading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : "S'inscrire "
                      }
                      </button>
                  </div>
                  
              </form>
        <div className="text-center mt-3">
        <Link href={"./login"} >J&#39;ai d&eacute;j&agrave; un compte</Link>
        </div>
            </div>
            {/* /.form-box */}
          </div>{/* /.card */}
        </div>
        {/* /.register-box */}
        
        {/* jQuery */}
        <script src="../../plugins/jquery/jquery.min.js"></script>
        {/* AdminLTE App */}
        <script src="../../dist/js/adminlte.min.js"></script>
        </body>
    );
}
