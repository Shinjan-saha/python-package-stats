// app/api/pepy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const packageName = req.nextUrl.searchParams.get('package');

  if (!packageName) {
    return NextResponse.json({ error: 'Package name is required' }, {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const response = await axios.get(`https://api.pepy.tech/api/v2/projects/${packageName}`, {
      headers: {
        Authorization: process.env.PEPY_API_KEY ? `Bearer ${process.env.PEPY_API_KEY}` : '',
      },
    });

    return NextResponse.json(response.data, {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Package not found or API failed' }, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
