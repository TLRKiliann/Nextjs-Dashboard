import filenameBrowser from '@/utils/browseros-data.json';

export async function GET() {
    return Response.json(filenameBrowser)
}