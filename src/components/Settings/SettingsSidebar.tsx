import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Profile', to: '/settings' },
  { label: 'Support', to: '/help' },
];

const SettingsSidebar = () => {
  return (
    <nav className="w-56 min-h-full border-r border-gray-200 bg-white ">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/settings'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded font-medium transition-colors
                ${isActive ? 'bg-gray-100 text-black font-bold' : 'text-gray-700 hover:bg-gray-50'}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsSidebar; 