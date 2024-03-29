import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import { StoreProvider } from "@/globalredux/StoreProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Moviefy",
  description: "Search your favourite movies and get their details",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
