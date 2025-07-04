import { Outlet, createRootRoute, createRoute, createRouter, lazyRouteComponent, useNavigate } from '@tanstack/react-router'
import { Page} from '@shopify/polaris'
import { NavMenu } from '@shopify/app-bridge-react';
const FastLink = ({ children, to, rel }) => {
    const navigate = useNavigate();
    return (
      <a
        rel={rel || ""}
        href={to}
        onClick={(e) => {
          e.preventDefault();
          navigate({to,replace:true,});
        }}
      >
        {children}
      </a>
    );
  };
  
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <NavMenu>
          <FastLink to={`/`} rel='home'> Dashboard </FastLink>
          <FastLink to={`/settings`}> Settings </FastLink>
        </NavMenu>
        <Outlet />
      </>
    ),
  })
  
  export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/`,
    shouldReload : true,
    staleTime: 0,
    component: lazyRouteComponent(() => import('./pages/Dashboard')),
    preload:true,
    pendingComponent : () => <Page
    subtitle="Test"
    title='Dashboard'
  >
  </Page>,
  });
  
  export const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    shouldReload : true,
    staleTime : 0,
    path: `/settings`,
    component: lazyRouteComponent(() => import("./pages/Settings")),
    pendingComponent : () => <Page
    subtitle="Settings"
    title={"Settings"}
  >
  </Page>,
  })
  
  const routeTree = rootRoute.addChildren([indexRoute, settingsRoute])
  const router = createRouter({ routeTree })
  export default router;