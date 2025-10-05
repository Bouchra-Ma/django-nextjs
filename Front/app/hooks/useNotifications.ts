'use client'
import { useState, useEffect } from 'react'

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = localStorage.getItem('token') 
        if (!token) {
  console.error("Pas de token trouvé dans localStorage !");
  return;
}
        const res = await fetch('http://127.0.0.1:8000/api/notifications/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // <--- token obligatoire
          }
        })

        if (!res.ok) throw new Error('Erreur fetch notifications')
        const data = await res.json()
        setNotifications(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return { notifications, loading }
}



