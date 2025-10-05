import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul>
          <li className="mb-2"><a href="/dashboard">Dashboard</a></li>
           <li className="mb-2"><a href="/dashboard/products" className="hover:text-gray-300">Produits</a></li>
          <li className="mb-2"><a href="/dashboard/reports">Reports</a></li>
          <li><a href="/dashboard/settings">Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  )
}

