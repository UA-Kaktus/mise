import { NavLink, Outlet } from 'react-router-dom'
import { Suspense, useState } from 'react'
import {
  Calendar,
  ChefHat,
  BookOpen,
  ShoppingCart,
  Settings,
  Menu,
  LogOut,
} from 'lucide-react'
// ShieldCheck

const navItems = [
  { to: '/plan', label: 'План', icon: Calendar },
  { to: '/dishes', label: 'Мої страви', icon: ChefHat },
  { to: '/catalog', label: 'Каталог', icon: BookOpen },
  { to: '/shopping', label: 'Покупки', icon: ShoppingCart },
  { to: '/settings', label: 'Налаштування', icon: Settings },
]

// const isAdmin = false

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('sidebar-collapsed') === 'true',
  )

  const navMenu = navItems.map(({ to, label, icon: Icon }) => {
    return (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          isActive ? 'активні класи' : 'звичайні класи'
        }
      >
        <Icon size={20} />
        {label}
      </NavLink>
    )
  })

  const toggle = () =>
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', String(!prev))
      return !prev
    })

  return (
    <div className="flex h-screen">
      <aside
        className={`hidden h-full flex-col gap-2 transition-[width] duration-200 lg:flex ${collapsed ? 'w-15' : 'w-45'}`}
      >
        <div className="flex justify-between gap-2">
          <span>Mise</span>
          <button onClick={toggle}>
            {' '}
            <Menu size={20} />
          </button>
        </div>
        {navMenu}
        <button>
          <LogOut size={20} />
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <nav className="lg:hidden">{navMenu}</nav>
    </div>
  )
}
