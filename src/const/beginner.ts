import { ArticleCategory } from "@/types/article";

/**
 * 新手導讀文章分類
 * 新增文章時，把物件放進對應分類的 articles 即可：
 * {
 *     title: '文章標題',
 *     link: 'https://...',
 *     platform: 'instagram',   // instagram | threads | medium | blog | other
 * }
 * 分類名稱請對應 public/locales/[tw|en]/common.json 的 beginner.category.[id]
 */
export const beginnerCategories: ArticleCategory[] = [
  {
    id: "newcomer",
    articles: [
      {
        title: "bachata 入圈一年心得",
        link: "https://www.threads.com/share/BAS-agPffo/",
        platform: "threads",
      },
      {
        title: "大家都說你好跳，所以你真的跳得好嗎？",
        link: "https://www.threads.com/share/BATJCtBleS/",
        platform: "threads",
      },
    ],
  },
  {
    id: "etiquette",
    articles: [
      {
        title: "彼此知道界線，也尊重彼此的界線",
        link: "https://www.threads.com/share/BARSHGNddq/",
        platform: "medium",
      },
      {
        title: "社交舞蹈近距離動作適當身體界線的11條基本原則（ig 圖文版）",
        link: "https://www.instagram.com/p/DGC66CKT6oK/?igsh=MTQzZHV0bG83b20wMQ==",
        platform: "instagram",
      },
      {
        title: "社交舞蹈近距離動作適當身體界線的11條基本原則（文字版）",
        link: "https://latiifahtsai.medium.com/%E7%A4%BE%E4%BA%A4%E8%88%9E%E8%B9%88%E8%BF%91%E8%B7%9D%E9%9B%A2%E5%8B%95%E4%BD%9C%E9%81%A9%E7%95%B6%E8%BA%AB%E9%AB%94%E7%95%8C%E7%B7%9A%E7%9A%8411%E6%A2%9D%E5%9F%BA%E6%9C%AC%E5%8E%9F%E5%89%87-11-basic-principles-for-maintaining-appropriate-physical-boundaries-in-39776d05d645",
        platform: "instagram",
      },
      {
        title: "在社交舞活動中遇到可能的騷擾行為怎麼辦？",
        link: "https://latiifahtsai.medium.com/%E5%9C%A8%E7%A4%BE%E4%BA%A4%E8%88%9E%E6%B4%BB%E5%8B%95%E4%B8%AD%E9%81%87%E5%88%B0%E5%8F%AF%E8%83%BD%E7%9A%84%E9%A8%B7%E6%93%BE%E8%A1%8C%E7%82%BA%E6%80%8E%E9%BA%BC%E8%BE%A6-108ed2798c47",
        platform: "medium",
      },
    ],
  },
  {
    id: "social",
    articles: [
      {
        title: "We dance, We don't teach in social",
        link: "https://www.instagram.com/p/DN2IxIz5Hgq/?igsh=ajIzcmNpOG83OG12",
        platform: "instagram",
      },
      {
        title: "不要教不是你的學生的人",
        link: "https://flowtaipei.com/%e7%a4%be%e4%ba%a4%e8%88%9e%e8%b9%88%e9%a0%98%e8%a2%96%e6%8f%90%e7%a4%ba1-%e4%b8%8d%e8%a6%81%e6%95%99%e4%b8%8d%e6%98%af%e4%bd%a0%e7%9a%84%e5%ad%b8%e7%94%9f%e7%9a%84%e4%ba%ba/",
        platform: "other",
      },
      {
        title: "舞會禮儀知多少？",
        link: "https://www.instagram.com/p/DF8SdNGTvBq/?igsh=MTZkZzJkNmg0N3QyYg%3D%3D",
        platform: "instagram",
      },
      {
        title: "社交禮儀 到底有哪些事不能做？",
        link: "https://www.instagram.com/p/Db8Rog9GL1j/?igsh=MXhibnc1ZG5tYXQ0NQ==&igsi=MXhibnc1ZG5tYXQ0NQ==",
        platform: "instagram",
      },
    ],
  },
];
