import { readFile } from "fs/promises";
import BarChartBrowser from './BarChartBrowser';

export default async function BrowsersFormatter() {

    const filenameBrowser = './utils/browseros-data.json';
    const file = await readFile(filenameBrowser, { encoding: 'utf8' });
    const dataBrowser = JSON.parse(file);

    const countFirefox = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Firefox")).length;
    const countGoogle = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Google")).length;
    const countSafari = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Safari")).length;

    const countEdge = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Edge")).length;
    const countOpera = dataBrowser.filter((data: {browser: string}) => data.browser.includes("Opera")).length;
    const countIE = dataBrowser.filter((data: {browser: string}) => data.browser.includes("IE")).length;

    return (
        <BarChartBrowser
            firefox={countFirefox}
            google={countGoogle}
            safari={countSafari}
            edge={countEdge}
            opera={countOpera}
            ie={countIE}
        />
    )
};
