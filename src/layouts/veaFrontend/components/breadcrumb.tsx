import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { MenuItem } from '@/config/types';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';

export function Breadcrumb() {
  const { pathname } = useLocation();
  const navigate = useNavigate(); 
  const { getBreadcrumb, isActive } = useMenu(pathname);
  const items: MenuItem[] = getBreadcrumb(MENU_SIDEBAR);


  const rootBreadcrumb: MenuItem = {
    title: 'Dashboard',
    path: '/',
  };


  const allItems: MenuItem[] =
    pathname === '/' ? [rootBreadcrumb] : [rootBreadcrumb, ...items];

  if (allItems.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
      {allItems.map((item, index) => {
        const last = index === allItems.length - 1;
        const active = item.path ? isActive(item.path) : false;

        return (
          <Fragment key={`root-${index}`}>
            <span
              className={cn(
                active ? 'text-mono' : 'text-secondary-foreground',
                item.path && 'cursor-pointer', 
              )}
              key={`item-${index}`}
              onClick={() => {
                if (item.path) {
                  navigate(item.path); 
                }
              }}
            >
              {item.title}
            </span>
            {!last && (
              <ChevronRight
                className="size-3.5 text-muted-foreground"
                key={`separator-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}