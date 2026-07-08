import '../styles/globals.css';
import { AppProvider } from '../context/AppContext.jsx';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
