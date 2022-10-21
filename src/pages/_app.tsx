import '../styles/global.css';
import '../styles/fonts.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Script
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services,clusterer&autoload=false`}
      strategy="beforeInteractive"
    />
    <Component {...pageProps} />
  </>
);

export default MyApp;
