import Home from "../views/Home";
import Application from "../views/Application";
import Dashboard from "../views/Dashboard";

var indexRoutes = [
  { path: "/", name: "Home", component: Home },
  { path: "/application", name: "Application", component: Application },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }
];

export default indexRoutes;
