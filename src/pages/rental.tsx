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
    return (
        <main>
            <Title
                enTitle='Rental'
                chTitle="練習場地租借"
            />
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
                <section>
                    <h3 className="text-xl font-bold mb-5">Paid 付費場地</h3>
                    <ul className="list-disc pl-4 flex flex-col gap-3">
                        {paidSpace.map(space => {
                            return <li key={space.name}><OuterLink href={space.link}>{space.name}</OuterLink></li>
                        })}
                    </ul>
                </section>
                <section>
                    <h3 className="text-xl font-bold mb-5">Free 免費場地</h3>
                    <ul className="list-disc pl-4 flex flex-col gap-3">
                        {freeSpace.map(space => {
                            return <li key={space.name}><OuterLink href={space.link}>{space.name}</OuterLink></li>
                        })}
                    </ul>
                </section>
            </div>
        </main>
    )
}