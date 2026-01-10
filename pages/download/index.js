export async function getServerSideProps () {
  return {
    redirect: {
      destination: '/download/banmanager',
      permanent: false
    }
  }
}

// This component will never render due to the redirect
export default function DownloadIndex () {
  return null
}
