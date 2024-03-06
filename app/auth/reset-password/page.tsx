import Link from "next/link";
import React from "react";

export default function RecoverPassword() {
  return (
    <body className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>Latouch</b> Numeric</a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Vous &ecirc;tes &agrave; un pas de votre nouveau mot de passe, changer maintenant.</p>

            <form action="login.html" method="post">
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Nouveau mot de passe" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Confirmer le mot de passe" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">Changer le mot de passe</button>
                </div>
                {/* /.col */}
              </div>
            </form>

            <p className="mt-3 mb-1">
              <Link href={"../login"}>Se connecter</Link>
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

