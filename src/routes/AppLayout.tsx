import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import {
  Calendar,
  ChefHat,
  BookOpen,
  ShoppingCart,
  Settings,
  Menu,
  LogOut,
  User,
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

  const { pathname } = useLocation()

  useEffect(() => {
    const current = navItems.find((item) => pathname.startsWith(item.to))
    document.title = current ? `${current.label} | Mise` : 'Mise'
  }, [pathname])

  const toggle = () =>
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', String(!prev))
      return !prev
    })

  return (
    <div className="flex h-screen flex-col p-2 lg:flex-row">
      {/* Desktop sidebar */}
      <aside
        className={`bg-surface shadow-card hidden h-full flex-col overflow-hidden rounded-lg border-[0.5px] border-black/5 [transition:width_200ms_ease] lg:flex ${collapsed ? 'w-16' : 'w-60'}`}
      >
        <div
          className={`flex items-center p-4 ${collapsed ? '' : 'justify-between'}`}
        >
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight whitespace-nowrap">
              Mise
            </span>
          )}
          <button
            onClick={toggle}
            aria-label="toggle sidebar"
            className="rounded-sm p-1.5 hover:cursor-pointer hover:bg-black/5"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-2">
          <ul className="flex flex-col gap-2 px-3">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => {
                    const base =
                      'flex min-h-10 items-center gap-3 rounded-sm p-2'
                    return isActive
                      ? `${base} text-accent bg-accent-subtle`
                      : `${base} hover:bg-black/5`
                  }}
                >
                  <Icon size={22} className="shrink-0" />
                  {!collapsed && (
                    <span className="whitespace-nowrap">{label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-border border-t px-3 py-3">
          <div className="flex min-h-10 items-center gap-3 rounded-sm p-2">
            <User size={22} className="text-text-secondary shrink-0" />
            {!collapsed && (
              <span className="text-text-secondary text-sm whitespace-nowrap">
                username
              </span>
            )}
          </div>
          <button className="flex min-h-10 w-full items-center gap-3 rounded-sm p-2 hover:cursor-pointer hover:bg-black/5">
            <LogOut size={22} className="text-text-secondary shrink-0" />
            {!collapsed && (
              <span className="text-text-secondary text-sm whitespace-nowrap">
                Вийти
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      {/* Mobile bottom nav */}
      <nav className="bg-surface shadow-card border-border overflow-hidden rounded-lg lg:hidden">
        <ul className="flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                aria-label={label}
                className={({ isActive }) =>
                  `flex min-h-14 w-full items-center justify-center ${
                    isActive ? 'text-accent bg-accent-subtle' : ''
                  }`
                }
              >
                <Icon size={22} />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
