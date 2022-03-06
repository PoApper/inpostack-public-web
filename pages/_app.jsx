import '../styles/font.scss';
import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.scss';

// import your default seo configuration
import { DefaultSeo } from 'next-seo'
import SEOConfig from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEOConfig } />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
