"use server"

import request from "@/app/lib/sdk"
import type { User } from "@/app/lib/calice.types"
import { revalidatePath } from "next/cache"

export async function updateRole({ id, role }: User) {
    await request.PATCH("/users/", {
        body: { id, role }
    })

    revalidatePath("/users")
}