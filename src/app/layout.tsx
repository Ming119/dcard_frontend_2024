import './style.css';

import Provider from './provider';
import Navbar from '../components/Navbar';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

export const metadata = {
  title: 'Dcard Frontend 2024',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options);

  return (
    <Provider session={session}>
      <html lang="en">
        <body>
          <header className="bg-blue-500 text-white">
            <Navbar />
          </header>

          <main className="container mx-auto">{ children }</main>
          
          <footer>
            {/* <p>© 2024 Dcard</p> */}
          </footer>
          </body>
      </html>
    </Provider>
  )
}
