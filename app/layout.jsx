import "./globals.css";

export const metadata = {
  title: "Poliklinik IPB",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
