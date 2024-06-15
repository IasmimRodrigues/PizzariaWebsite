"use client";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import logo from "./logo.svg";
import pizza from "./pizza.png";

// import voltar from "./voltar.svg";

interface Product {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  banner: string;
  url: string;
}

interface ProductListProps {
  categoryId: string;
}

const ProductList = ({ categoryId }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token não encontrado. Faça login novamente.");
        }

        const response = await axios.get(
          "http://localhost:3333/category/product?id_categoria=2165705d-6ac3-430a-8321-72f7b581ae69",
          {
            params: { id_categoria: categoryId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

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
            {localStorage.getItem("token") ? "Logout" : "Login"}
          </Link>
        </div>
      </nav>
      <div className="content-cardapio">
        <div className="product-list-container">
          <h2 className="product-list-title">Cardápio</h2>
          {/* <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  src={product.url}
                  alt={product.nome}
                  width="100"
                  height="100"
                />
                <h3>{product.nome}</h3>
                <p>{product.descricao}</p>
                <p>Preço: {product.preco}</p>
              </li>
            ))}
            <li className="product-item add-product-item">
              <Link className="link" href="/cadastrarProd">
                Cadastrar Pizza
              </Link>
            </li>
          </ul> */}

          <div >
            <ul className="products">
              {products.map((product) => (
                <li key={product.id} className="product-item product-list">
                  <img
                  className="image-product"
                  src={product.url}
                  alt={product.nome}
                  width="100"
                  height="100"
                />
                  <h3>{product.nome}</h3>
                  <p>{product.descricao}</p>
                  <h4>{product.preco}</h4>
                </li>
              ))}
              <li className="product-item add-product-item"></li>
            </ul>
{/* 
            <ul className="product-list">
              <li className="product-item">
                <Image className="image-product" src={pizza} alt="" />
                <h3>Calabresa</h3>
                <p>Molho de tomate, Calabresa, mussarela, catupiry</p>
                <h4>45,00</h4>
              </li>
              <li className="product-item add-product-item"></li>
            </ul>

            <ul className="product-list">
              <li className="product-item">
                <Image className="image-product" src={pizza} alt="" />
                <h3>Calabresa</h3>
                <p>Molho de tomate, Calabresa, mussarela, catupiry</p>
                <h4>45,00</h4>
              </li>
              <li className="product-item add-product-item"></li>
            </ul> */}
          </div>
        </div>
      </div>
      <footer>© 2024 La Pizzaria. Todos os direitos reservados.</footer>
    </>
  );
};

export default ProductList;
