import { uploadImage } from '@stateManagement/queries/imagesQuery'
import apiSlice from './apiSlice'

export const imagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		uploadImage: builder.mutation(uploadImage),
	})
})

export const {
	useUploadImageMutation,

} = imagesApi