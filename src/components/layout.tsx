import { Outlet } from 'react-router-dom';
import { Nav } from './nav';

export function Layout() {
  return (
    <div className="flex gap-x-16">
      <Nav />
      <Outlet />
    </div>
  );
}
