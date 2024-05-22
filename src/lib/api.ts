import { error } from "@sveltejs/kit";
import type { CaliceHttpMethod, CaliceRESTRoute } from "$lib/types";

const apiProtocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
const apiHost = process.env.VERCEL_URL || 'fastapi:8000'
const apiPath = 'api'

const apiBaseUrl = `${apiProtocol}://${apiHost}/${apiPath}`

async function send({ method, path, data } : { method: CaliceHttpMethod, path: CaliceRESTRoute, data?: object }) {
    const opts : RequestInit = { method }

    if (data) {
        opts.headers = {
            'Content-Type': 'application/json'
        }
        opts.body = JSON.stringify(data)
    }

    const res = await fetch(`${apiBaseUrl}${path}`, opts)

    if (res.ok || res.status === 422) {
        const text = await res.text()
        return text ? JSON.parse(text) : {}
    }

    throw error(res.status)
}

export default {
    get: (path: CaliceRESTRoute) => send({ method: 'get', path }),
    post: (path: CaliceRESTRoute, data: object) => send({ method: 'post', path, data }),
    put: (path, data) => send({ method: 'put', path, data })
}