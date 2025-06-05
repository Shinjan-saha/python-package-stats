import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const packageName = req.nextUrl.searchParams.get('package');

  if (!packageName) {
    return NextResponse.json({ error: 'Package name is required' }, {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const response = await axios.get(`https://api.pepy.tech/api/v2/projects/${packageName}`, {
      headers: {
        Authorization: process.env.PEPY_API_KEY ? `Bearer ${process.env.PEPY_API_KEY}` : '',
      },
    });

    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Error fetching package';
    const status = error?.response?.status || 500;
    return new NextResponse(JSON.stringify({ error: message }), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
