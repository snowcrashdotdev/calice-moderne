import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/tournament-list.tsx"),
    route("/create", "routes/tournament-create.tsx"),
    route("/:id", "routes/tournament.tsx"),
    route("/:id/edit", "routes/tournament-update.tsx")
] satisfies RouteConfig;
