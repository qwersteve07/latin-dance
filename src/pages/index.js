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
			thumbnail: "/sky.png",
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
			thumbnail: "/tbv.jpg",
			hosts: [
				{
					name: "Eric Chen",
					image: "/eric_chen.png",
				},
				{
					name: "吳天天",
					image: "/tian_tian.png",
				},
			],
		},
		{
			id: "flow-taipei",
			team: "Flow Taipei",
			thumbnail: "/flow.png",
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
			thumbnail: "/lasalsa.jpg",
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
		{
			id: "bailalo-dance-studio",
			team: "Bailalo Dance Studio",
			thumbnail: "/bailalo.jpeg",
			hosts: [
				{
					name: "Maggie",
					image: "/maggie.png",
				},
				{
					name: "Yiwen",
					image: "/yiwen.png",
				},
			],
		},
	];

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

	useEffect(() => {
		if (!id) return;
		const result = hostData.find((d) => d.id === id);
		console.log(result);
		setCurrentHost(() => result);
	}, [id]);

	return (
		<div className="flex justify-between items-center flex-col justify-items-center min-h-screen px-8 py-8 container mx-auto">
			<div>
				<h1 className="text-3xl font-bold mb-6 text-center">
					新手須知 & 舞會守則
				</h1>
				<p className="mb-4 text-center max-md:text-left">
					歡迎加入社交舞的世界！這是一個充滿樂趣和自我成長的環境，但初次參與可能會有些不安，或是疑惑的地方。以下是幾點你需要知道的建議，幫助你更快融入這個圈子：
				</p>
				<ul className="list-disc mb-4">
					{groundRules.map((r) => (
						<li
							key={r.title}
							className="mb-2"
						>
							<div className="text-lg font-bold">{r.title}</div>
							<div>{r.desc}</div>
						</li>
					))}
				</ul>
				<p className="mb-12">
					違反上述規定，勸告未果且情節嚴重者，將
					「終止舞會權利，請求離場」，並公告於其他台北地區舞會主辦單位
					。若在舞池中遇到騷擾、不恰當的行為，
					<b>可直接向主辦方以及現場工作人員反應</b>
					，也請關注身邊的友人，留心可疑人士及自身財物狀況。
				</p>
				<h2 className="text-3xl font-bold mb-6 text-center">主辦方</h2>
				<p className="mb-10 text-center max-md:text-left">
					以下為當前活動的主辦方，以及相關成員，若在舞池中遇到問題，或是課程想了解，不用擔心直接詢問，每位老師都是非常友善的！
				</p>
				<h3 class="text-center text-2xl font-bold mb-4">
					{currentHost?.team}
				</h3>
				<div className="flex justify-center items-center gap-12 mb-12">
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
				<h3 className="text-2xl font-bold mb-8 text-center">
					查看其他主辦方
				</h3>
				<div className="flex justify-center items-center gap-12">
					{hostData
						.filter((h) => h.id !== currentHost?.id)
						.map((h) => (
							<div
								key={h.team}
								className="flex justify-center items-center flex-col gap-4"
								onClick={() =>
									(window.location.href = `http://${window.location.host}/?id=${h.id}`)
								}
							>
								<Image
									className="rounded-full w-[100px] h-[100px]"
									src={h.thumbnail}
									alt={h.team}
									width={100}
									height={100}
									priority
								/>
								<div className="text-xl">{h.team}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
