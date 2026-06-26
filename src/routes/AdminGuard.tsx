import { Outlet } from 'react-router-dom'

// тут в майбутньому перевіряю адмін права і тільки потім пускаю далі
// is_admin → redirect /plan
export default function AdminGuard() {
  return <Outlet />
}
