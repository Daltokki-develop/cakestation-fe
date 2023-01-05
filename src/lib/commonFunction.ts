// 세션스토리지에서 값 추출
import axios from 'axios';

export const getSession = (key: any) => {
  return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
};

//  리뷰 데이터를 세션스토리지에서 추출
export const getSessionReview = () => {
  const sessionReview = getSession('ReviewData');
  return sessionReview ? JSON.parse(sessionReview) : {};
};

// 세션스토리지에서 유저 데이터 추출
export const getSessionUserData = () => {
  const sessionUserData = getSession('UserData');
  return sessionUserData ? JSON.parse(sessionUserData) : null;
};

// 메인 화면 검색어 기록 받아오기
export const getSessionSearchHistory = () => {
  const sessionSearchHistory = getSession('SearchHistory');
  return sessionSearchHistory ? JSON.parse(sessionSearchHistory) : null;
};

// 메인 화면 검색어 기록 추가하기
export const setSessionSearchHistory = (searchHistory: Object) => {
  sessionStorage.setItem('SearchHistory', JSON.stringify(searchHistory));
};

// axios 요청에 포함될 헤더 값 세팅
const getAuthHeader = (method: string) => {
  const sessionUserData = getSessionUserData();

  let token = '';
  if (!!sessionUserData && !!sessionUserData.accessToken) {
    token = sessionUserData.accessToken;
  }

  const header = {
    Authorization: token,
    'Access-Control-Allow-Credentials': true,
    'Content-Type': '',
  };

  switch (method) {
    case 'GET':
    case 'DELETE':
      break;

    case 'POST':
    case 'PUT':
      header['Content-Type'] = 'application/json';
      break;

    case 'FORM':
      header['Content-Type'] = 'multipart/form-data';
      break;

    default:
      break;
  }

  return header;
};

// 데이터 요청 타임 아웃 시간
const TIME_OUT = 2500;

// 헤더가 세팅된 axios GET 요청
export const AXIOS_GET = (url: string, timeOut: number = TIME_OUT) => {
  console.log(`====== AXIOS_GET =======`);
  console.log('url :: ', url);

  const header = getAuthHeader('GET');
  console.log('header :: ', header);
  console.log(`========================`);

  return axios
    .get(url, {
      headers: header,
      timeout: timeOut,
    })
    .catch(function (error) {
      console.log(`========= ERROR ========`);
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log('# 데이터 :: ', error.response.data);
        console.log('# 상태 :: ', error.response.status);
        console.log('# 헤더 :: ', error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log('# config :: ', error.config);
      console.log(`========================`);
    });
};

// 헤더가 세팅된 axios POST 요청
export const AXIOS_POST = (
  url: string,
  sendString = '',
  timeOut: number = TIME_OUT
) => {
  console.log(`====== AXIOS_POST ======`);
  console.log('url :: ', url);

  const header = getAuthHeader('POST');
  console.log('header :: ', header);
  console.log(`========================`);

  return axios
    .post(url, sendString, {
      headers: header,
      timeout: timeOut,
      // withCredentials: true,
    })
    .catch(function (error) {
      console.log(`========= ERROR ========`);
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(
          '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.'
        );
        console.log('# 데이터 :: ', error.response.data);
        console.log('# 상태 :: ', error.response.status);
        console.log('# 헤더 :: ', error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log('요청이 이루어 졌으나 응답을 받지 못했습니다.');
        console.log('# 리퀘스트 ": ', error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log(
          '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.'
        );
        console.log('# 에러 :: ', error.message);
      }
      console.log('# config :: ', error.config);
      console.log(`========================`);
    });
};

export const AXIOS_POST_OBJECT = (
  url: string,
  sendObject: Object,
  timeOut = TIME_OUT
) => {
  const header = getAuthHeader('POST');

  return axios
    .post(url, sendObject, {
      headers: header,
      timeout: timeOut,
    })
    .catch(function (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(
          '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.'
        );
        console.log('# 데이터: ', error.response.data);
        console.log('# 상태: ', error.response.status);
        console.log('# 헤더: ', error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log('요청이 이루어 졌으나 응답을 받지 못했습니다.');
        console.log('# 리퀘스트: ', error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log(
          '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.'
        );
        console.log('# 에러: ', error.message);
      }
      console.log('# config: ', error.config);
    });
};

export const AXIOS_POST_FORM = (
  url: string,
  sendObject: FormData,
  timeOut = TIME_OUT
) => {
  const header = getAuthHeader('FORM');
  console.log(sendObject, 'sendObject');
  console.log(header, 'header');

  return axios
    .post(url, sendObject, {
      headers: header,
      timeout: timeOut,
    })
    .catch(function (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(
          '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.'
        );
        console.log('# 데이터: ', error.response.data);
        console.log('# 상태: ', error.response.status);
        console.log('# 헤더: ', error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log('요청이 이루어 졌으나 응답을 받지 못했습니다.');
        console.log('# 리퀘스트: ', error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log(
          '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.'
        );
        console.log('# 에러: ', error.message);
      }
      console.log('# config: ', error.config);
    });
};
