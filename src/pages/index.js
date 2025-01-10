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

  const beginnerRules = [
    {
      title: "放輕鬆，享受過程",
      desc: "剛開始時，不要過度擔心自己的舞步或技巧，沒有人是天生的舞者，最重要的是享受音樂與和人互動的過程！",
    },
    {
      title: "不怕犯錯，大膽嘗試",
      desc: "初學者常會出錯，這是正常的過程，不用因此感到尷尬。",
    },
    {
      title: "學習基本禮儀",
      desc: "尊重舞伴的節奏和風格，保持適當的身體距離。",
    },
  ];

  const handleSituationList = [
    "直接說不，要求對方停止甚至離開舞池都可以",
    "告知主辦方",
    "告訴你所有跳舞的朋友們(聯合抵制)",
  ];

  const groundRules = [
    {
      title: "保持良好的個人衛生",
      desc: "確保自己穿戴整潔，避免異味（如香水過濃或汗味）。",
    },
    {
      title: "尊重他人空間",
      desc: "不論是邀舞或跳舞時，都應注意不要太過親密，保持適當的距離。",
    },
    {
      title: "邀舞＆回應",
      desc: "以禮貌的方式來進行，若被拒絕，不要勉強或感到冒犯。同樣的被拒絕時，也應以禮貌的方式回應。",
    },
    {
      title: "避免在場地中教舞",
      desc: "不要主動去進行教導的行為，如果對方不熟悉舞步，可以建議對方去教室學習，而非在社交舞池中教導。",
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
      className={`flex justify-between items-center flex-col justify-items-center min-h-screen px-12 py-20`}
    >
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          給剛加入社交舞圈新手的須知
        </h1>
        <p className="mb-4">
          歡迎加入社交舞的世界！這是一個充滿樂趣和自我成長的環境，但初次參與可能會有些不安，或是疑惑的地方。以下是幾點你需要知道的建議，幫助你更快融入這個圈子：
        </p>
        <ul className="list-disc mb-12">
          {beginnerRules.map((r) => (
            <li key={r.title}>
              <div className="text-lg font-bold">{r.title}</div>
              <div>{r.desc}</div>
            </li>
          ))}
        </ul>
        <p className="mb-4">
          在舞池中可能會遇到形形色色的人群，但也因為身體接觸的關係，可能會遇到一些不確定的狀況。在面臨這種狀況時，千萬不用擔心或猶豫，可以直接以下列方式處理：
        </p>
        <ul className="list-disc mb-12">
          {handleSituationList.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <h2 className="text-3xl font-bold mb-6 text-center">主辦方</h2>
        <p className="text-center mb-10">
          以下為當前活動的主辦方，以及相關成員，若在舞池中遇到問題，或是課程想了解，不用擔心直接詢問，每位老師都是非常友善的！
        </p>
        <h3 class="text-center text-2xl font-bold mb-4">{currentHost?.team}</h3>
        <div className="flex justify-center items-center gap-12">
          {currentHost?.hosts.map((h) => (
            <div
              key={h.name}
              className="flex justify-center items-center flex-col gap-4"
            >
              <Image
                className="rounded-lg"
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-10">
        Content by Eric Chen. Website by Steve Lee
      </footer>
    </div>
  );
}
