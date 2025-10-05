'use client'
import { useNotifications } from '../../hooks/useNotifications'

export default function NotificationBell() {
  const { notifications, loading, unreadCount } = useNotifications()

  return (
    <div className="relative">
      <button className="text-gray-700 p-2 rounded hover:bg-gray-200">
        🔔
        {!loading && unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
        )}
      </button>

      {/* Liste des notifications */}
      {notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded border overflow-hidden z-50">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-2 border-b text-sm ${n.lu ? 'text-gray-500' : 'text-gray-900 font-bold'}`}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

