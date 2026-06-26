import { Outlet } from 'react-router-dom'

// тут в майбутньому перевіряю авторизацію і тільки потім пускаю далі
export default function ProtectedRoute() {
  return <Outlet />
}
