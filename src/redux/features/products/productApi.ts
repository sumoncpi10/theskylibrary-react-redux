import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books',
    }),
    searchProducts: builder.query({
      query: (text: string) => `/searchBook/${text}`,
      // providesTags: ['books'],
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
    }),
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/book/${_id}`,
        method: 'DELETE',
      }),
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
  useDeleteProductMutation,
  usePostCommentMutation,
  useSingleProductQuery,
} = productApi;
