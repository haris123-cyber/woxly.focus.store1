import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Woxly home">
      <span>WOXLY</span>
    </Link>
  );
}
