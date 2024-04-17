import api from '$lib/api'

export const actions = {
    default: async ({ request }) => {	
        const data = await request.formData()
		const serlializedData = {}

		for (let [field, value] of data.entries()) {
			serlializedData[field] = value
		}

		const res = await api.put('/tournaments/', serlializedData)

		return res
    }
}