import create from 'zustand';

const useStore = create((set) => ({
  reviews: [
    {
      photo: [],
      cakeNumber: '1호',
      sheetType: '레몬',
      requestOption: '추가 옵션',
      satisfaction: '매우 만족해요!',
      score: 4.5,
      tags: ['직원이 친절해요', '역과 가까워요'],
      content: '하고싶은 말',
    },
  ],
  updateAddPictures: (review: any) =>
    set((state: any) => ({
      reviews: state.reviews.map((item: any) => {
        return {
          ...item,
          photo: review.photo,
        };
      }),
    })),
  updateOrder: (review: any) =>
    set((state: any) => ({
      reviews: state.reviews.map((item: any) => {
        return {
          ...item,
          cakeNumber: review.cakeNumber,
          sheetType: review.sheetType,
          requestOption: review.requestOption,
        };
      }),
    })),
  updateSatisfaction: (review: any) =>
    set((state: any) => ({
      reviews: state.reviews.map((item: any) => {
        return {
          ...item,
          satisfaction: review.satisfaction,
        };
      }),
    })),
  updateGeneral: (review: any) =>
    set((state: any) => ({
      reviews: state.reviews.map((item: any) => {
        return {
          ...item,
          score: review.score,
          tags: review.tags,
          content: review.content,
        };
      }),
    })),
}));

export const useReviewStore = useStore;
