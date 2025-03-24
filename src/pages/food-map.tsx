import Title from "@/components/title";
import { NextSeo } from "next-seo";

export default function FoodMap() {
    return (
        <>
            <NextSeo
                title="Food Map 宵夜地圖"
                description="Social 結束後可以去吃宵夜的推薦地點"
                openGraph={{
                    type: 'website',
                    url: 'http://social-dance.tw/food-map',
                    siteName: 'Taiwan Social Dance Guide | Food Map 宵夜地圖',
                    description: 'Social 結束後可以去吃宵夜的推薦地點',
                }}
            />
            <Title
                enTitle='Food Map'
                chTitle="Social 後的宵夜地圖"
            />
            <p>If you know something good to eat after social, please let me know :)</p>
            <div className="w-full h-[600px] mt-4">
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1o4Z6W9OdDjXTamrkv85Sj8CGqYPFJqk&ehbc=2E312F&noprof=1" width="100%" height="100%" />
            </div>
        </>
    )
}