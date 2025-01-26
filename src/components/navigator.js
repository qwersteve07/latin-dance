import Link from "next/link";
import { useRouter } from "next/router";

const routes = [
  { id: "/", name: "舞會守則" },
  { id: "/studio", name: "活動單位" },
  { id: "/calendar", name: "活動指南" },
];

export default function Navigator() {
  const router = useRouter();

  return (
    <nav className="flex justify-center items-center mb-8">
      {routes.map((r) => {
        return router.pathname === r.id ? (
          <div key={r.id} className="mx-3 py-1 border-b-2 border-b-blue-500">
            {r.name}
          </div>
        ) : (
          <Link
            href={r.id}
            key={r.id}
            className="mx-3 py-1 hover:text-blue-500"
          >
            {r.name}
          </Link>
        );
      })}
    </nav>
  );
}
