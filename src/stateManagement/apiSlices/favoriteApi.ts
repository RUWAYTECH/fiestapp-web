import apiSlice from './apiSlice'
import { addFavorite, allFavorite, deleteFavorite, getFavoriteByserviceId, getMyFavorite } from '@stateManagement/queries/favoriteQuery'

export const favoriteApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		allFavorite: builder.query(allFavorite),
		getFavoriteByserviceId: builder.query(getFavoriteByserviceId),
		addFavorite: builder.mutation(addFavorite),
		deleteFavorite: builder.mutation(deleteFavorite),
		getMyFavorite: builder.query(getMyFavorite)
	})
})

export const {
	useAllFavoriteQuery,
	useGetFavoriteByserviceIdQuery,
	useLazyGetFavoriteByserviceIdQuery,
	useAddFavoriteMutation,
	useDeleteFavoriteMutation,
	useGetMyFavoriteQuery,
} = favoriteApi