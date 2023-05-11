import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import LoginModals from '@/components/modals/loginmodals'
import RegisterModals from '@/components/modals/registermodal'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterModals/>
      <LoginModals/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
    
   
}
