import { Sidebar } from "./home/side-bar";

/**
 * A layout component for the dashboard.
 *
 * It contains a sidebar and a main content area. The sidebar is
 * always visible on large screens, and is hidden on small screens.
 * The main content area is always visible, and takes up the
 * remaining space.
 *
 * @param {{children: React.ReactNode}} props Component props
 * @returns {React.ReactElement} The rendered component
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 w-[75%] overflow-y-auto">{children}</div>
    </div>
  );
}
