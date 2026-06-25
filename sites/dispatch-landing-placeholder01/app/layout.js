import { Geist } from "next/font/google";
import "./globals.css";

// Geist — a free, self-hosted neo-grotesk used as a near-match to Palantir's
// commercial title face, Söhne. Self-hosted by next/font (no external request).
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata = {
  title: "We make agents do cool things.",
  description: "We make agents do cool things.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
