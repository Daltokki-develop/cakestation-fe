// 세션스토리지에서 값 추출
export const getSession = (key: any) => {
  return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
};

//  리뷰 데이터를 세션스토리지에서 추출
export const getSessionReview = () => {
  const sessionReview = getSession('ReviewData');
  return sessionReview ? JSON.parse(sessionReview) : {};
};
