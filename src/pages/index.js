"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [currentHost, setCurrentHost] = useState();

  const id = searchParams.get("id");

  const hostData = [
    {
      id: "dance-salsa-under-sky",
      team: "天空下跳 salsa",
      hosts: [
        {
          name: "蔣哥",
          image: "/cyc_chiang.png",
        },
      ],
    },
    {
      id: "taipei-bachata-vibes",
      team: "TaipeiBachata Vibes",
      hosts: [
        {
          name: "Eric Chen",
          image: "/eric_chen.png",
        },
        {
          name: "天天",
          image: "/tian_tian.png",
        },
      ],
    },
    {
      id: "flow-taipei",
      team: "Flow Taipei",
      hosts: [
        {
          name: "Glenn",
          image: "/glenn.png",
        },
        {
          name: "Mandy",
          image: "/mandy.png",
        },
        {
          name: "Nana",
          image: "/nana.png",
        },
        {
          name: "Tyra",
          image: "/tyra.png",
        },
      ],
    },
    {
      id: "lasalsa-taipei",
      team: "LaSalsa Taipei",
      hosts: [
        {
          name: "Larry",
          image: "/larry.png",
        },
        {
          name: "Jessica",
          image: "/jessica.png",
        },
        {
          name: "Vivi",
          image: "/vivi.png",
        },
        {
          name: "Maha",
          image: "/maha.png",
        },
      ],
    },
  ];

  useEffect(() => {
    if (!id) return;
    const result = hostData.find((d) => d.id === id);
    console.log(result);
    setCurrentHost(() => result);
  }, [id]);

  return (
    <div
      className={`flex justify-between items-center flex-col justify-items-center min-h-screen p-8 pb-20 sm:p-20`}
    >
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">新手須知</h1>
        <ul className="list-disc mb-12">
          <li>直接說不，要求對方停止甚至離開舞池都可以</li>
          <li>告知主辦方</li>
          <li>告訴你所有跳舞的朋友們(聯合抵制)</li>
        </ul>
        <h2 className="text-3xl font-bold mb-6 text-center">主辦方</h2>
        <h3 class="text-center text-xl font-bold mb-4">{currentHost?.team}</h3>
        <div className="flex justify-center items-center gap-10">
          {currentHost?.hosts.map((h) => (
            <div
              key={h.name}
              className="flex justify-center items-center flex-col"
            >
              <Image
                src={h.image}
                alt={h.name}
                width={100}
                height={100}
                priority
              />
              <div className="text-xl">{h.name}</div>
            </div>
          ))}
        </div>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Content by Eric Chen. Website by Steve Lee
      </footer>
    </div>
  );
}
