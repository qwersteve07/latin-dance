import OuterLink from "@/components/outerLink";
import Title from "@/components/title";

export default function Rental() {

    const paidSpace = [
        {
            name: '藝能館',
            link: 'https://pocastar.booknow.com.tw/toolbooking/XE2UNgvC7GtjDnJti_RDGjkhkfz_xBEO6WdyNfON9so'
        }, {
            name: 'DFD蜻蜓舞蹈教室',
            link: 'http://dfddancestudio.com.tw/txt.php?t_id=3'
        }, {
            name: 'Practice Everything',
            link: 'https://www.practice-everything-dm.com/'
        }, {
            name: 'Flow Taipei',
            link: 'https://flowtaipei.com/rental/'
        }, {
            name: '自由室',
            link: 'https://freestylestudiotw.com/freestyle/freestylestudio.html'
        }, {
            name: '傳承排練場 ',
            link: 'https://www.facebook.com/TPDdance'
        },
        {
            name: 'Latinesa Studio安達亞拉丁',
            link: 'https://www.fit-book.com.tw/latinesa/'
        },
        {
            name: 'E1 Studio',
            link: 'https://e1studio.booknow.com.tw/'
        }
    ]

    const freeSpace = [
        {
            name: '中山地下街 | 爵士廣場',
            link: "https://service.gov.taipei/rental/VenueDetail/6f0602120655"
        },
        {
            name: '西門地下街 | 第3廣場',
            link: "https://service.gov.taipei/rental/VenueDetail/619e8c1b0c4f"
        }, {
            name: '東區地下街 | 10號出口廊道',
            link: 'https://service.gov.taipei/rental/VenueDetail/65805e424596'
        }
    ]

    const shoeStores = [
        {
            name: '美佳莉舞鞋',
            link: 'https://www.dpassion.net/'
        }, {
            name: '女王舞鞋',
            link: 'https://www.facebook.com/queensdancingheels'
        }, {
            name: '安法舞鞋',
            link: 'https://www.afadanceshoes.com/'
        }, {
            name: '寶琦華舞蹈生活用品館',
            link: 'https://www.bourdance.com.tw/'
        }
    ]
    return (
        <main>
            <Title
                enTitle='Others'
                chTitle="各項資訊"
            />
            <h3 className="text-2xl font-bold mb-5 border-b border-gray-300 pb-4">Rental 場地租借</h3>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 mb-16">
                <section>
                    <h4 className="text-xl font-bold mb-5">Paid 付費場地</h4>
                    <ul className="list-disc pl-4 flex flex-col gap-3">
                        {paidSpace.map(item => {
                            return <li key={item.name}><OuterLink href={item.link}>{item.name}</OuterLink></li>
                        })}
                    </ul>
                </section>
                <section>
                    <h4 className="text-xl font-bold mb-5">Free 免費場地</h4>
                    <ul className="list-disc pl-4 flex flex-col gap-3">
                        {freeSpace.map(item => {
                            return <li key={item.name}><OuterLink href={item.link}>{item.name}</OuterLink></li>
                        })}
                    </ul>
                </section>
            </div>
            <h3 className="text-2xl font-bold mb-5 border-b border-gray-300 pb-4">Shoes 舞鞋購買</h3>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 mb-16">
                <ul className="list-disc pl-4 flex flex-col gap-3">
                    {shoeStores.map(item => {
                        return <li key={item.name}><OuterLink href={item.link}>{item.name}</OuterLink></li>
                    })}
                </ul>
            </div>
        </main>
    )
}