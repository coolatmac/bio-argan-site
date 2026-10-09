import { createContext, useContext, useState, useEffect, useCallback, ReactNode, MouseEvent } from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

const initialPath = typeof window !== 'undefined' ? window.location.pathname : '/';

interface RouterProviderProps {
  children: ReactNode;
  initialPath?: string;
}

export function RouterProvider({ children, initialPath: initialPathProp }: RouterProviderProps) {
  const [path, setPath] = useState(initialPathProp ?? initialPath);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function useLocation() {
  const { path } = useRouter();
  return { pathname: path };
}

export function useParams<T extends Record<string, string>>(): T {
  const { path } = useRouter();
  const params: Record<string, string> = {};
  const segments = path.split('/').filter(Boolean);
  const currentRoute = (globalThis as Record<string, unknown>).__currentRoutePattern as string | undefined;
  if (currentRoute) {
    const patternSegments = currentRoute.split('/').filter(Boolean);
    patternSegments.forEach((seg, i) => {
      if (seg.startsWith(':') && segments[i]) {
        params[seg.slice(1)] = decodeURIComponent(segments[i]);
      }
    });
  }
  return params as T;
}

interface RoutesProps {
  children: ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const { path } = useRouter();
  const segments = path.split('/').filter(Boolean);

  const routeArray = Array.isArray(children) ? children : [children];

  for (const route of routeArray) {
    const pattern = route.props.path as string;
    const patternSegments = pattern.split('/').filter(Boolean);

    if (patternSegments.length !== segments.length) continue;

    let matched = true;
    for (let i = 0; i < patternSegments.length; i++) {
      if (!patternSegments[i].startsWith(':') && patternSegments[i] !== segments[i]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      (globalThis as Record<string, unknown>).__currentRoutePattern = pattern;
      return <>{route.props.element}</>;
    }
  }

  return null;
}

interface RouteProps {
  path: string;
  element: ReactNode;
}

export function Route(_props: RouteProps) {
  return null;
}

interface LinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Link({ to, className, children, onClick }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
