import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    route("/:id", "routes/tournament.tsx"),
    ...prefix("manage", [
        layout("./routes/manage/layout.tsx", [
            index("./routes/manage/tournament-list.tsx"),
            route("/games", "./routes/manage/game-list.tsx")
        ]),
        route("/create", "./routes/manage/tournament/create.tsx"),
        route("/:id/edit", "./routes/manage/tournament/update.tsx"),
        ...prefix("game", [
            route("/create", "./routes/manage/game/create.tsx"),
            route("/:id", "./routes/manage/game/update.tsx")
        ])
    ])

] satisfies RouteConfig;
