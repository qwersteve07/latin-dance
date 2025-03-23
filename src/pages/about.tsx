import ContactIcons from "@/components/contact";
import OuterLink from "@/components/outerLink";
import Title from "@/components/title";

export default function About() {
    return (
        <div className="leading-8">
            <Title
                enTitle='About'
                chTitle="關於此網站"
            />
            <p className="flex justify-start items-center gap-2">嗨我是 Steve，一隻 2023 年 9 月剛加入圈子的菜雞🐔，你可以在這邊找到我<ContactIcons /></p>
            <p>起初是在 2025 年 1 月跟 Eric Chen 討論說，是否有個更好的管道，讓剛加入舞圈的新手朋友們能夠去了解圈內文化和一些常見的問題處理（畢竟社交舞的性質本來就容易造成一些問題🙂），而後開始有了製作這網站的想法。</p>
            <p>結果做一做後發現，找活動資訊一直都是個痛點，不如也加一加？結果一不小心就變成這樣了。</p>
            <p>希望這份指南能夠更幫助台灣拉丁社交舞圈的發展，也歡迎看到這邊的各位，有任何意見都可以回饋給我，在這邊先謝謝大家了。</p>
            <p>如果想要抖內我的話，<OuterLink href="https://portaly.cc/qwersteve07/support">也可以到這邊</OuterLink>，贊助我一點主機費用🥹</p>
            <h3 className="mt-8 font-bold text-xl">Special Thanks</h3>
            <p>
                Amy、Ariel、Arthur、Brianna、Calvin、Charlene、Eric Chen、Fiona、Glenn、
                Jenny、Josephine、JW、Kiki、Latiifah、Leticia、Mandy、Mics、Natasha、Patty
                RayGo、Rosalie、Sam、Susan、Trison、Yuyu、Vicky Chichi、Vicky老王、
                丁丁、天天、拉拉、閃亮亮
            </p>
        </div>
    )
}