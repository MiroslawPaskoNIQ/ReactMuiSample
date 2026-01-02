import { 
    type RouteConfig, 
    index,
    route
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("mui-list", "routes/mui-list.tsx"),
    route("react-list", "routes/react-list.tsx")
] satisfies RouteConfig;
