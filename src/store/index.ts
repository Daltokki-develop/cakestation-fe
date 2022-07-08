import create from 'zustand';

const useStore = create((set) => ({
  reviews: [
    {
      id: '1',
      name: '이유리',
      content: '퉤 맛없어요 퉤퉤퉤ㅞㅜ퉤퉤퉤투테ㅜ퉤투퉷',
    },
    {
      id: '2',
      name: '민은영',
      content: '케이크가 친절하고 사장님이 맛잇서요~! 😁',
    },
    { id: '3', name: '오디', content: '애옹 애오왜앵 웅애 애우응 궭 앵' },
  ],
  addReview: (review: any) =>
    set((state: any) => ({
      reviews: [
        {
          name: review.name,
          id: `${Math.random() * 100}`,
          content: review.content,
        },
        ...state.reviews,
      ],
    })),
  removeReview: (id: any) =>
    set((state: any) => ({
      reviews: state.reviews.filter((review: any) => review.id !== id),
    })),
  updateReview: (review: any) =>
    set((state: any) => ({
      reviews: state.reviews.map((item: any) => {
        if (item.id === review.id) {
          return {
            ...item,
            name: review.name,
            content: review.content,
          };
        }
        return item;
      }),
    })),
}));

export const useReviewStore = useStore;
