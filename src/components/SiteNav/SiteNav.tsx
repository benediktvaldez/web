"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteNav.module.css";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/thoughts", label: "Thoughts" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.name}>
          Benedikt D. Valdez
        </Link>
        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
