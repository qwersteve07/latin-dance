import Link from "next/link";
import { useRouter } from "next/router";

const routes = [
  { id: "/", name: "舞會守則" },
  { id: "/hosts", name: "活動單位" },
  { id: "/calendar", name: "活動指南" },
];

export default function Navigator() {
  const router = useRouter();

  return (
    <nav className="bg-white fixed top-0 z-10  border-b border-b-gray-300 w-full">
      <div className="flex justify-between items-center h-16 container mx-auto px-6">
        <div className="text-2xl">💃🕺</div>
        <div className="flex justify-between items-center">
          {routes.map((r) => {
            return router.pathname === r.id ? (
              <div key={r.id} className="mx-3 py-1 font-bold text-blue-500">
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
        </div>
      </div>
    </nav>
  );
}
