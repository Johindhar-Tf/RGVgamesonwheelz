import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RGV Games on Wheelz | #1 Mobile Gaming Bus in Rio Grande Valley",
  description:
    "The #1 Mobile Gaming Bus & Video Game Truck Rental in Rio Grande Valley. We bring the ultimate gaming party to you in McAllen, Edinburg, Mission, Pharr, Brownsville & Harlingen.",
  keywords:
    "mobile gaming bus, video game truck rental, RGV, Rio Grande Valley, McAllen, birthday party, gaming party",
  openGraph: {
    title: "RGV Games on Wheelz",
    description: "The #1 Mobile Gaming Party Bus in the Rio Grande Valley",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
