import apiSlice from './apiSlice'
import { addFavorite, allFavorite, deleteFavorite, getFavoriteByserviceId } from '@stateManagement/queries/favoriteQuery'

export const favoriteApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		allFavorite: builder.query(allFavorite),
		getFavoriteByserviceId: builder.query(getFavoriteByserviceId),
		addFavorite: builder.mutation(addFavorite),
		deleteFavorite: builder.mutation(deleteFavorite),
	})
})

export const {
	useAllFavoriteQuery,
	useGetFavoriteByserviceIdQuery,
	useLazyGetFavoriteByserviceIdQuery,
	useAddFavoriteMutation,
	useDeleteFavoriteMutation,

} = favoriteApi