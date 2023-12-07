import React from "react";
import type { Pokemon } from "@/app/page";
import styles from "./Card.module.css";

type Props = {
  key: number | string;
  pokemon: Pokemon;
};

export default function Card({ pokemon }: Props) {
  return (
    <div key={pokemon.name} className={styles.card}>
      <div className={styles.no}>{pokemon.id}</div>
      <img
        src={
          pokemon.sprites.back_default ??
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png"
        }
        alt={pokemon.name}
        width={96}
        height={96}
        style={{
          aspectRatio: "1 / 1",
          imageRendering: "crisp-edges",
        }}
      />
      <h3 className={styles.name}>{pokemon.name}</h3>
      <div className={styles.types}>
        {pokemon.types.map((v) => (
          <span key={v.type.name} className={styles[v.type.name]}>
            {v.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
