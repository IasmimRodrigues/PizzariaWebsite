"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function doLogin(formEvent: FormEvent) {
    formEvent.preventDefault();

    if (email === "" || senha === "") {
      setError("Preencha todos os campos!");
      return;
    }

    const response = await axios.post("http://localhost:3333/session", {
      email: email,
      senha: senha,
    });
    if (response.status === 200) {
      localStorage.setItem("session", response.data.token);
      router.push("/homePage");
    } else {
      setError(response.data.error);
    }
  }

  return (
    <>
      <div className="content-login">
        <div className="login">
          <div className="title">
            <h2>Faça seu login!</h2>
            <span>
              A melhor pizza, com os melhores ingredientes, está a apenas alguns
              cliques de distância. Faça já seu login!
            </span>
          </div>

          <div className="form">
            <form onSubmit={doLogin}>
              <div className="input">
                <label htmlFor="login">Login:</label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="text"
                  id="login"
                  name="login"
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="senha">Senha:</label>
                <input
                  onChange={(event) => setSenha(event.target.value)}
                  type="password"
                  id="senha"
                  name="senha"
                  required
                />
              </div>

              <button type="submit">Entrar</button>
            </form>
          </div>

          <h3 className="link-cadastro">
            Ainda não possui login?
            <Link className="link" href={"/cadastrar"}>
              Clique aqui e faça seu cadastro!
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}
