import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function convertBlockTime(blockTime: bigint) {
  const date = new Date(Number(blockTime) * 1000);
  dayjs.extend(relativeTime);
  return dayjs().to(dayjs(date));
}
