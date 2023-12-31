import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: '/book',
        method: 'POST',
        body: data,
      }),
    }),
    getProducts: builder.query({
      query: () => '/books',
    }),
    searchProducts: builder.query({
      query: (text: string) => `/searchBook/${text}`,
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
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: data,
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
  useAddProductMutation,
  useGetCommentQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  usePostCommentMutation,
  useSingleProductQuery,
} = productApi;
