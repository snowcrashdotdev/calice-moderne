import { error } from "@sveltejs/kit";

const base = 'http://fastapi:8000/api'

async function send({ method, path, data }) {
    const opts = { method, headers: {} }

    if (data) {
        opts.headers['Content-Type'] = 'application/json'
        opts.body = JSON.stringify(data)
    }

    const res = await fetch(`${base}/${path.replace(/^\//, '')}`)

    if (res.ok || res.status === 422) {
        const text = await res.text()
        return text ? JSON.parse(text) : {}
    }

    throw error(res.status)
}

export default {
    get: (path) => send({ method: 'GET', path }),
    post: (path) => send({ method: 'POST', path })
}