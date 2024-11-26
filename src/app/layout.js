import { Figtree } from 'next/font/google';
import ThemeScript from '@/lib/ThemeScript'; // https://github.com/Hugomndez/nextjs-app-darkmode
import { ApolloWrapper } from "@/lib/apollo-provider";
import "./globals.css";

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree'
})

export const metadata = {
  title: "Missouri Historical Society",
  description: "Accessibility app for the Missouri Historical Society",
  authors: [{ name: 'Dave Kobrenski' }, { name: 'RLMG', url: 'https://rlmg.com' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${figtree.className} antialiased`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
