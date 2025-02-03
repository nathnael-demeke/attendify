export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get('http://localhost:5000/attendance');
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching from backend:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}