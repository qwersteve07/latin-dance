import Title from "@/components/title";

export default function FoodMap() {
    return (
        <div>
            <Title
                enTitle='Food Map'
                chTitle="Social 後的宵夜地圖"
            />
            <p>If you know something good to eat after social, please let me know :)</p>
            <div className="w-full h-[600px] mt-4">
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1o4Z6W9OdDjXTamrkv85Sj8CGqYPFJqk&ehbc=2E312F&noprof=1" width="100%" height="100%" />
            </div>
        </div>
    )
}