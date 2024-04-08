import api from '$lib/api'
import { redirect } from '@sveltejs/kit'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const serlializedData = {}

		for (let [field, value] of data.entries()) {
			serlializedData[field] = value
		}

		const res = await api.post('/tournaments/', serlializedData)

		if (! res.slug) return res
		
		throw redirect(303, `/dashboard/tournaments/${res.slug}/edit`)
	}
};