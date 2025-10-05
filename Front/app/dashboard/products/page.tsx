'use client'

import { useEffect, useState } from 'react'
import NotificationBell from '../components/NotificationBell'
import Image from 'next/image'


type Product = {
  reference: string
  nom: string
  prix: number
  quantite: number
  image: string
}

type PaginatedProducts = {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [prevPage, setPrevPage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)

  const fetchProducts = async (pageNum: number) => {
    try {
      const res = await fetch(`/api/products?page=${pageNum}`)
      const data: PaginatedProducts = await res.json()
      setProducts(data.results)
      setNextPage(data.next)
      setPrevPage(data.previous)
      setPage(pageNum)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">📦 Produits</h1>
      <NotificationBell />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {products.map((product) => (
  <div key={product.reference} className="p-4 bg-white shadow-lg rounded-lg text-gray-900">
      <Image
      src={product.image}
      alt={product.nom}
      width={400}
      height={300}
      className="rounded mb-3"
    />
    <h2 className="font-bold text-lg mb-1">{product.nom}</h2>
    <p className="mb-1">Prix : {product.prix} €</p>
    <p>Quantité : {product.quantite}</p>
  </div>
))}

      </div>

      <div className="flex justify-between">
        <button
          onClick={() => prevPage && fetchProducts(page - 1)}
          disabled={!prevPage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          ← Précédent
        </button>

        <button
          onClick={() => nextPage && fetchProducts(page + 1)}
          disabled={!nextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}