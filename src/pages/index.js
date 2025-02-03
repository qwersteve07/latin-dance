import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import hostJson from "../hosts.json";
import HostImage from "@/components/hostImage";
import MemberImage from "@/components/memberImage";

export default function Home() {
  const searchParams = useSearchParams();
  const [currentHost, setCurrentHost] = useState();
  const router = useRouter();

  const id = searchParams.get("id");

  const groundRules = [
    {
      title: "放輕鬆，享受過程",
      desc: "剛開始時，不要過度擔心自己的舞步或技巧，沒有人是天生的舞者，最重要的是享受音樂與和人互動的過程！",
    },
    {
      title: "維持舞池基本禮儀",
      desc: "保持身體清潔、口腔衛生，維持跳舞的品質（建議使用香水、體香劑、毛巾、並定時更換衣物）",
    },
    {
      title: "保持專注",
      desc: "禁止以不當方式帶舞，造成舞伴受傷。",
    },
    {
      title: "維持舒適的跳舞體驗",
      desc: "保持良好的舞蹈空間，避免有過度推擠，碰觸敏感部位（臉、胸、臀）等等..不當行為。",
    },
    {
      title: "避免在場地中教舞",
      desc: "參與舞會以開心跳舞為目的，禁止在舞池進行任何形式的「教學」行為。",
    },
  ];

  const recommendList = [
    {
      title: '跳bachata被吃豆腐-舞會中性騷擾的法律責任',
      link: 'https://latiifahtsai.medium.com/跳bachata被吃豆腐-舞會中性騷擾的法律責任-所有雙人舞是用-acae7620bf26'
    },{
      title: 'Sensual Bachata保持適當身體界限的11條基本原則',
      link: 'https://latiifahtsai.medium.com/sensual-bachata保持適當身體界限的11條基本原則-efe494d3adbd'
    },{
      title: '不要教不是你的學生的人',  
      link: 'https://flowtaipei.com/%e7%a4%be%e4%ba%a4%e8%88%9e%e8%b9%88%e9%a0%98%e8%a2%96%e6%8f%90%e7%a4%ba1-%e4%b8%8d%e8%a6%81%e6%95%99%e4%b8%8d%e6%98%af%e4%bd%a0%e7%9a%84%e5%ad%b8%e7%94%9f%e7%9a%84%e4%ba%ba/'
    }
  ]

  useEffect(() => {
    if (!id) return;
    const result = hostJson.find((d) => d.id === id);
    setCurrentHost(() => result);
  }, [id]);

  return (
    <div className="flex justify-between items-center flex-col justify-items-center min-h-screen container mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-5">新手須知 & 舞會守則</h1>
        <p className="mb-4 ">
          歡迎加入社交舞的世界！這是一個充滿樂趣和自我成長的環境，但初次參與可能會有些不安，或是疑惑的地方。以下是幾點你需要知道的建議，幫助你更快融入這個圈子：
        </p>
        <ul className="list-disc pl-4 mb-4">
          {groundRules.map((r) => (
            <li key={r.title} className="mb-2">
              <div className="text-lg font-bold">{r.title}</div>
              <div>{r.desc}</div>
            </li>
          ))}
        </ul>
        <p className="mb-8">
          違反上述規定，勸告未果且情節嚴重者，將
          「終止舞會權利，請求離場」，並公告於其他台北地區舞會主辦單位
          。若在舞池中遇到騷擾、不恰當的行為，
          <b>可直接向主辦方以及現場工作人員反應</b>
          ，也請關注身邊的友人，留心可疑人士及自身財物狀況。
        </p>
		<h2 className="text-2xl font-bold mb-4">推薦閱讀</h2>
		<ul className="list-disc pl-2 mb-12 text-blue-500 font-bold">
    {recommendList.map(item=>{
        return (
          <li className="py-1" key={item.title}>
            <a
              href={item.link}
              className="relative before-content-['] before:w-full before:h-3 before:absolute before:-bottom-1 before:bg-blue-100 before:z-[-1] before:scale-x-0 before:hover:scale-x-[1] before:origin-left before:transition-all before:duration-300"
              target="_blank"
            >
              {item.title}
            </a>
			    </li>
        )
      })}
		</ul>
        {currentHost && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">主辦單位</h2>
            <p className="mb-10 text-center max-md:text-left">
              以下為本活動的主辦方，以及相關成員，若在舞池中遇到問題，或是課程想了解，不用擔心直接詢問，所有主辦方都是非常友善的！
            </p>
            <h3 className="text-center text-2xl font-bold mb-4">
              {currentHost?.name}
            </h3>
            <div className="flex justify-center items-center gap-x-12 gap-y-4 mb-12 flex-wrap">
              {currentHost?.member.map((h) => (
                <div key={h.name} className="text-center">
                  <MemberImage src={h.image} alt={h.name} />
                  <div className="text-xl mt-3">{h.name}</div>
                </div>
              ))}
            </div>
          </>
        )}
        <h3 className="text-2xl font-bold mb-8 text-center">
          {currentHost ? "查看其他活動單位" : "查看活動單位"}
        </h3>
        <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
          {hostJson
            .filter((h) => h.id !== currentHost?.id)
            .map((h) => (
              <div
                key={h.name}
                className="flex justify-center items-center flex-col gap-4"
                onClick={() => router.push(`/hosts?id=${h.id}`)}
              >
                <HostImage src={h.thumbnail} alt={h.name} />
                <div className="text-xl">{h.team}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
