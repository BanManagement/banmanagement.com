import Link from 'next/link'
import { Layout } from 'components/layout'

export default function Custom404 () {
  return (
    <Layout title="404">
      <div className="h-screen flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-2xl md:text-3xl font-light leading-normal"
            >Sorry, we couldn&apos;t find this page. </p>

            <Link href='/' className="mt-6 mb-12 md:mb-0 md:mt-10 inline-block py-3 px-8 text-white bg-primary-500 hover:bg-primary-600 rounded-lg shadow">Homepage</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
