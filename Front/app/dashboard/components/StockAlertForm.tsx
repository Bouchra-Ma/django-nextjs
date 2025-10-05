// app/components/StockAlertForm.tsx
'use client'
import { useState } from 'react'

export default function StockAlertForm({ productId }: { productId: number }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`http://127.0.0.1:8000/api/alerts/${productId}/`, {
      method: 'POST',
      body: new URLSearchParams({ email })
    })
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-gray-800 text-white p-2 rounded">
        Recevoir une alerte
      </button>
      {message && <p className="text-green-600">{message}</p>}
    </form>
  )
}
