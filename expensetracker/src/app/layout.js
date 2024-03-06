
export const metadata = {
  title: 'Expense Tracker',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}