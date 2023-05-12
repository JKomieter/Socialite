import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import LoginModals from '@/components/modals/loginmodals'
import RegisterModals from '@/components/modals/registermodal'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster/>
      <RegisterModals/>
      <LoginModals/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
    
   
}
