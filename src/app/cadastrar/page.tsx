"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import voltar from "./voltar.svg";

export default function Cadastro() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function doCadastro(formEvent: FormEvent) {
    formEvent.preventDefault();

    // Email validation regex for nome@provedor.com.br format
    const emailRegex = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Password validation regex for 6-8 characters, at least one number and one special character
    const senhaRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;

    if (name === "" || email === "" || senha === "") {
      setError("Preencha todos os campos!");
      return;
    }

    if (name.length < 3) {
      setError("O nome deve ter no mínimo 3 caracteres");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("O email é inválido");
      return;
    }

    if (!senhaRegex.test(senha)) {
      if (senha.length < 6 || senha.length > 8) {
        setError("A senha deve ter entre 6 e 8 caracteres");
      } else if (!/[0-9]/.test(senha)) {
        setError("A senha deve conter pelo menos um número");
      } else if (!/[!@#$%^&*]/.test(senha)) {
        setError("A senha deve conter pelo menos um caractere especial");
      }
      return;
    }

    try {
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
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Erro ao tentar cadastrar. Tente novamente.");
      } else {
        setError("Erro ao tentar cadastrar. Tente novamente.");
      }
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

              <div className="input input-margin">
                <label htmlFor="login">Login:</label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="text"
                  id="login"
                  name="login"
                  required
                />
              </div>

              <div className="input input-margin">
                <label htmlFor="senha">Senha:</label>
                <input
                  onChange={(event) => setSenha(event.target.value)}
                  type="password"
                  id="senha"
                  name="senha"
                  required
                />
              </div>

              {error && <p className="error">⚠️ {error}</p>}

              <button type="submit">Cadastrar</button>
            </form>
          </div>

          <h3 className="link-cadastro">
            Já possui cadastro?
            <Link className="link" href={"/login"}>
              Clique aqui e faça seu login!
            </Link>
          </h3>

          <div className="voltar">
            <Link className="link-voltar" href={"/homePage"}>
              <Image src={voltar} alt="" />
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
