"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "./logo.svg";

// Imagens
import bannerPizza from "./bannerPizza.png";
import banner2 from "./banner2.png";
import card1 from "./card1.svg";
import card2 from "./card2.svg";
import card3 from "./card3.svg";
import card4 from "./card4.svg";

export default function HomePage() {
  return (
    <>
      <nav>
        <div className="logo">
          <Image src={logo} alt=""/>
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
              <Link className="link" href={"/listar"}>
                Produtos
              </Link>
            </li>
          </ul>
        </div>
        <div className="link-login">
          <Link className="link" href={"/login"}>
            Login
          </Link>
        </div>
      </nav>
      <div className="content-home">
        <div className="banner">
          <Image src={bannerPizza} alt="" />
        </div>

        <div className="cards">
          <div className="card">
            <Image className="imageCard" src={card1} alt="" />
            <h3>Ingredientes de qualidade</h3>
            <p>
              Utilizamos apenas ingredientes frescos e selecionados para
              garantir o melhor sabor.
            </p>
          </div>

          <div className="card">
            <Image className="imageCard" src={card2} alt="" />
            <h3>Receitas tradicionais</h3>
            <p>
              Nossas pizzas são feitas com receitas tradicionais e técnicas
              artesanais.
            </p>
          </div>

          <div className="card">
            <Image className="imageCard" src={card3} alt="" />
            <h3>Ambiente aconchegante</h3>
            <p>
              Desfrute de um ambiente acolhedor e familiar perfeito para
              qualquer ocasião.
            </p>
          </div>

          <div className="card">
            <Image className="imageCard" src={card4} alt="" />
            <h3>Variedade de sabores</h3>
            <p>
              Oferecemos uma ampla variedade de sabores e combinações
              inovadoras.
            </p>
          </div>
        </div>

        <div className="banner2">
          <Image src={banner2} alt="" />
        </div>

        <div className="cardapio">
          <h2>Acesse o nosso cardápio!</h2>
          <p>Descubra nossas deliciosas pizzas, feitas com ingredientes frescos e receitas artesanais. Explore a variedade de sabores e combinações que preparamos especialmente para você!</p>

          <Link className="link-cardapio" href={"/listar"}>
                Acessar
              </Link>
        </div>

        <footer>
        © 2024 La Pizzaria. Todos os direitos reservados.
        </footer>

      </div>
    </>
  );
}
