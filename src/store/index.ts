import create from 'zustand';

const useStore = create((set) => ({
  reviews: [
    {
      nearByStation: '회기',
      walkingDistance: '5분',
      photo: [],
      cakeNumber: '1호',
      sheetType: '레몬',
      requestOption: '추가 옵션',
      score: 4.5,
      tags: ['직원이 친절해요', '역과 가까워요'],
      content: '하고싶은 말',
    },
  ],
  addReview: (review: any) =>
    set((state: any) => ({
      reviews: [
        {
          nearByStation: review.nearByStation,
          walkingDistance: review.walkingDistance,
          photo: review.photo,
          cakeNumber: review.cakeNumber,
          sheetType: review.sheetType,
          requestOption: review.requestOption,
          score: review.score,
          tags: review.tags,
          content: review.content,
        },
        ...state.reviews,
      ],
    })),
  removeReview: (id: any) =>
    set((state: any) => ({
      reviews: state.reviews.filter((review: any) => review.id !== id),
    })),
  updateDistance: (review: any) =>
    set((state: any) => ({
      reviews: state.reviews.map((item: any) => {
        return {
          ...item,
          nearByStation: review.nearByStation,
          walkingDistance: review.walkingDistance,
        };
      }),
    })),
}));

export const useReviewStore = useStore;
