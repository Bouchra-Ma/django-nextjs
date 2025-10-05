'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

type Product = {
  reference: string;
  nom: string;
  prix: number;
  quantite: number;
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : data.results || []))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Dashboard</h1>

      {/* Graphique sur le stock */}
      <div className="bg-white shadow rounded-xl p-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quantité par produit</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="nom" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="quantite" fill="#9ca3af" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Liste des produits */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Produits en stock</h2>
        <div className="grid grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.reference} className="p-4 bg-white shadow rounded-lg text-gray-800">
              <h3 className="font-bold text-lg">{product.nom}</h3>
              <p className="text-sm text-gray-600">Prix : {product.prix} €</p>
              <p className="text-sm text-gray-600">Quantité : {product.quantite}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
