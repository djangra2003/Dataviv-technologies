import { Provider } from 'react-redux';
import { AppProps } from 'next/app'; // Import AppProps from next/app
import store from '../store';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) { // Use AppProps to type the props
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;