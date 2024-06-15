"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import logo from "./logo.svg";

import voltar from "./voltar.svg";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [banner, setBanner] = useState<File | null>(null); // Estado para armazenar o arquivo de imagem
  const id_categoria = "2165705d-6ac3-430a-8321-72f7b581ae69"; // ID da categoria fixo

  const [error, setError] = useState("");

  async function cadastrarProduto(formEvent: FormEvent) {
    formEvent.preventDefault();

    if (nome === "" || preco === "" || descricao === "" || !banner) {
      setError("Preencha todos os campos!");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", preco);
    formData.append("descricao", descricao);
    formData.append("file", banner);
    formData.append("id_categoria", id_categoria);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
      }
      const response = await axios.post(
        "http://localhost:3333/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Aqui você pode decidir o que fazer após cadastrar o produto com sucesso
        router.push("/produtos");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.error ||
            "Erro ao tentar cadastrar o produto. Tente novamente."
        );
      } else {
        setError("Erro ao tentar cadastrar o produto. Tente novamente.");
      }
    }
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setBanner(file);
    }
  }

  return (
    <>
      <nav>
        <div className="logo">
          <Image src={logo} alt="" />
        </div>
        <div className="links-nav">
          <ul>
            <li>
              <Link className="link" href={"/homePage"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="link" href={"/cadastrarProd"}>
                Cadastrar
              </Link>
            </li>
            <li>
              <Link className="link" href={"/produtos"}>
                Produtos
              </Link>
            </li>
          </ul>
        </div>
        <div className="link-login">
          <Link className="link" href={"/login"}>
          {localStorage.getItem('token') ? 'Logout' : 'Login'}
          </Link>
        </div>
      </nav>
      <div className="content-login">
        <div className="login">
          <div className="title">
            <h2>Cadastro de Produto</h2>
            <span>Cadastre seu produto abaixo.</span>
          </div>

          <div className="form">
            <form onSubmit={cadastrarProduto}>
              <div className="input">
                <label htmlFor="nome">Sabor:</label>
                <input
                  onChange={(event) => setNome(event.target.value)}
                  type="text"
                  id="nome"
                  name="nome"
                  required
                />
              </div>

              <div className="input input-margin">
                <label htmlFor="preco">Preço:</label>
                <input
                  onChange={(event) => setPreco(event.target.value)}
                  type="text"
                  id="preco"
                  name="preco"
                  required
                />
              </div>

              <div className="input input-margin">
                <label htmlFor="descricao">Ingredientes:</label>
                <input
                  onChange={(event) => setDescricao(event.target.value)}
                  type="text"
                  id="descricao"
                  name="descricao"
                  required
                />
              </div>

              <div className="input input-margin">
                <label htmlFor="banner">Banner:</label>
                <input
                  onChange={handleImageUpload}
                  type="file"
                  id="banner"
                  name="banner"
                  accept="image/*"
                  required
                />
              </div>

              {error && <p className="error">⚠️ {error}</p>}

              <button type="submit">Cadastrar</button>
            </form>
          </div>

          {/* <div className="voltar">
            <Link className="link-voltar" href={"/homePage"}>
              <Image src={voltar} alt="Voltar" />
              Voltar
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
