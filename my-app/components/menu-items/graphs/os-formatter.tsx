import { readFile } from "fs/promises";
import BarChartOs from './BarChartOs';

export default async function OsFormatter() {

    // fetch from json()
    const filenameBrowser = './utils/browseros-data.json';
    const file = await readFile(filenameBrowser, { encoding: 'utf8' });
    const dataBrowser = JSON.parse(file);

    const countLinux = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Linux")).length;
    const countWindows = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Windows")).length;
    const countMac = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Mac")).length;

    return (
        <BarChartOs linux={countLinux} mac={countMac} windows={countWindows} />
    )
};
