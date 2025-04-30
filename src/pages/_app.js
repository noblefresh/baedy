import Loading from "@/components/organisms/Loading";
import Store from "@/Store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {


  let persistor = persistStore(Store)

  return (
    <Provider store={Store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
  // ;
}
