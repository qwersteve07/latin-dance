import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
    return (
        <h1 className="text-4xl font-bold mb-8 max-md:text-3xl">{children}</h1>
    );
}
