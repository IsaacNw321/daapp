import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { UserProvider } from "@auth0/nextjs-auth0/client";



const client = new QueryClient()

const App = ({ 
  Component, 
  pageProps
}: AppProps) =>{
 
  return (
    <UserProvider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App;