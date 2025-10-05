'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

type Product = {
  nom: string
  quantite: number
  prix: number
}

interface Props {
  products: Product[]
}

export default function DashboardStats({ products }: Props) {
  // Données pour le graphique
  const data = products.map(p => ({
    name: p.nom,
    quantite: p.quantite,
    prix: p.prix
  }))

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">📊 Stock des produits</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantite" fill="#2563eb" name="Quantité" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

