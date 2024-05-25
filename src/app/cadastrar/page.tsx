"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cadastro() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function doCadastro(formEvent: FormEvent) {
    formEvent.preventDefault();

    if (name === "" || email === "" || senha === "") {
      setError("Preencha todos os campos!");
      return;
    }

    const response = await axios.post("http://localhost:3333/user", {
      name: name,
      email: email,
      senha: senha,
    });
    if (response.status === 200) {
      localStorage.setItem("session", response.data.token);
      router.push("/login");
    } else {
      setError(response.data.error);
    }
  }

  return (
    <>
      <div className="content-login">
        <div className="login">
          <div className="title">
            <h2>Faça seu cadastro!</h2>
            <span>
              Junte-se a nós e desfrute da melhor pizza, sempre com a
              conveniência que você merece.
            </span>
          </div>

          <div className="form">
            <form onSubmit={doCadastro}>
              <div className="input">
                <label htmlFor="name">Nome:</label>
                <input
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

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
            Já possui cadastro?
            <Link className="link" href={"/login"}>
              Clique aqui e faça seu login!
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}
