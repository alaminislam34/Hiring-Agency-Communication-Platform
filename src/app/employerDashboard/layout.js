import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for Dashboard */}
      <aside className="w-52 bg-gray-800 text-white p-4">
        <Link href={"/"} className="text-xl font-bold">
          JobHive
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard" className="block p-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2">
                Applications
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2">
                Subscriptions
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2">
                Messages
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Dashboard Content */}
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}
