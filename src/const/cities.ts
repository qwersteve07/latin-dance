export const citiesList = [
    {
        id: 'taipei',
        name: '台北',
        nameEn: 'Taipei',
    },
    {
        id: 'taichung',
        name: '台中',
        nameEn: 'Taichung',
    },
    {
        id: 'south-taiwan', // includes kaohsiung / tainan / pingtung
        name: '南台灣',
        nameEn: 'South Taiwan',
    }
]

export const southTaiwanCities = ['kaohsiung', 'tainan' , 'pingtung']

// 內容會依城市不同的頁面：這些頁面的網址會帶 ?city=，分享出去對方就會看到同一個地區
export const cityPages = ['/', '/calendar', '/classes', '/organizers']

export const isCityId = (value: unknown): value is string =>
    typeof value === 'string' && citiesList.some(city => city.id === value)
