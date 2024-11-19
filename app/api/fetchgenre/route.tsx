// /src/app/api/fetchgenre/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN; //get api key from .env.local


  //if apiToken is falsy, then return error Movie Api key is missing with status 500
  if (!apiToken) {
    return NextResponse.json({ error: 'Movie API key is missing.' }, { status: 500 });
  }
   //try catch block, to fetch data and catch any errors 
  try {
    //read the get api key from Movie
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data); //response with data, status 200
  } catch (error) {
    console.error('Error fetching Movie data:', error);
    return NextResponse.json({ error: 'Error fetching Movie data.' }, { status: 500 });
  }
}

