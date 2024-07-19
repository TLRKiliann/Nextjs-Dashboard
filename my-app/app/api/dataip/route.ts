import filenameIp from '@/utils/ip-data.json';

export async function GET() {
    return Response.json(filenameIp)
}