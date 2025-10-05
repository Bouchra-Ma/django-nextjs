import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get('page')) || 1
    const pageSize = 3

    // Fetch vers ton backend Django
    const res = await fetch('http://127.0.0.1:8000/api/products/', {
      headers: {
        'Authorization': 'Bearer <TON_JWT>' // si nécessaire
      }
    })

    const data = await res.json()

    // Pagination côté Next.js
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const results = data.slice(start, end)

    const total = data.length
    const next = end < total ? `/api/products?page=${page + 1}` : null
    const previous = start > 0 ? `/api/products?page=${page - 1}` : null

    return NextResponse.json({
      count: total,
      next,
      previous,
      results
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ count: 0, next: null, previous: null, results: [] }, { status: 500 })
  }
}


