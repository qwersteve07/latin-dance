import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeek)

export const useDay = () => {
    return dayjs
}