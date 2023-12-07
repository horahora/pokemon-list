"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    back_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

const PAGE_LIMIT = 20;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [pokemonData, setPokemonData] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  } | null>(null);

  const [pokemonList, setPokemonList] = useState<(Pokemon | null)[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ message: "" });
  const [offset, setOffset] = useState(
    page ? (parseInt(page) - 1) * PAGE_LIMIT : 0
  );

  useEffect(() => {
    if (page) {
      setOffset((parseInt(page) - 1) * PAGE_LIMIT);
    }
  }, [page]);

  useEffect(() => {
    setIsFetching(true);
    fetch(`${API_URL}?limit=${PAGE_LIMIT}&offset=${offset}}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setPokemonData(data);
        setIsFetching(false);
        setPokemonList(Array.from({ length: PAGE_LIMIT }, () => null));
        data.results.forEach(({ url }: { url: string }, index: number) =>
          fetch(url)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(response);
            })
            .then((pokemon: Pokemon) => {
              setPokemonList((prev) => {
                const newList = [...prev];
                newList[index] = pokemon;
                return newList;
              });
            })
        );
      })
      .catch((response) => {
        setIsError(true);
        setError({ message: response.statusText });
        console.log(response.status, response.statusText);
      });
  }, [offset]);

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {pokemonData ? (
          pokemonList.map((pokemon) =>
            pokemon ? <Card key={pokemon.name} pokemon={pokemon} /> : null
          )
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
      {pokemonData && (
        <Pagination
          totalPage={Math.ceil(pokemonData.count / PAGE_LIMIT)}
          activePage={Math.ceil((offset + 1) / PAGE_LIMIT)}
        />
      )}
    </main>
  );
}
