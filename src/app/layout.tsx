import './style.css';

export const metadata = {
  title: 'Dcard Frontend 2024',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
        </header>

        <main>{ children }</main>
        
        <footer>
        </footer>
      </body>
    </html>
  )
}
