import styles from "./Pagination.module.css";
import Link from "next/link";

type Props = {
  totalPage: number;
  activePage: number;
  siblingCount?: number;
};

export default function Pagination({
  totalPage,
  activePage,
  siblingCount = 2,
}: Props) {
  if (totalPage < 2) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <Link
        className={`${styles.anchor} ${activePage < 2 && styles.disabled}`}
        href={`/?page=${activePage - 1}`}
      >
        <svg viewBox="0 0 16 16" width={20} height={20}>
          <path
            d="M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"
            fill="currentColor"
          ></path>
        </svg>
      </Link>
      <Link
        className={`${styles.anchor} ${1 === activePage ? styles.active : ""}`}
        href={`/?page=1`}
      >
        {1}
      </Link>
      {activePage - siblingCount - 1 > 1 && (
        <div className={styles.dots}>...</div>
      )}
      {Array.from(
        { length: totalPage },
        (_, i) =>
          activePage + siblingCount > i &&
          activePage - siblingCount - 2 < i &&
          ![0, totalPage - 1].includes(i) && (
            <Link
              key={i}
              className={`${styles.anchor} ${
                i + 1 === activePage ? styles.active : ""
              }`}
              href={`/?page=${i + 1}`}
            >
              {i + 1}
            </Link>
          )
      )}
      {totalPage - activePage - siblingCount > 1 && (
        <div className={styles.dots}>...</div>
      )}
      <Link
        className={`${styles.anchor} ${
          totalPage === activePage ? styles.active : ""
        }`}
        href={`/?page=${totalPage}`}
      >
        {totalPage}
      </Link>
      <Link
        className={`${styles.anchor} ${
          activePage === totalPage && styles.disabled
        }`}
        href={`/?page=${activePage + 1}`}
      >
        <svg viewBox="0 0 16 16" width={20} height={20}>
          <path
            d="M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z"
            fill="currentColor"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
