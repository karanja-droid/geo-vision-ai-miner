
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

interface MobileNavigationGroupProps {
  title: string;
  items: NavItem[];
}

export const MobileNavigationGroup: React.FC<MobileNavigationGroupProps> = ({ title, items }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="mb-1 px-4 text-lg font-semibold">{title}</h3>
      <div className="flex flex-col">
        {items.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            asChild
            className="justify-start px-4 py-2 h-auto text-left"
          >
            <Link to={item.href} className="flex items-center gap-3">
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export const MobileDirectLinks: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="mb-1 px-4 text-lg font-semibold">Quick Links</h3>
      <div className="flex flex-col">
        <Button
          variant="ghost"
          asChild
          className="justify-start px-4 py-2 h-auto text-left"
        >
          <Link to="/" className="flex items-center gap-3">
            Dashboard
          </Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="justify-start px-4 py-2 h-auto text-left"
        >
          <Link to="/user-profile" className="flex items-center gap-3">
            Profile
          </Link>
        </Button>
      </div>
    </div>
  );
};
