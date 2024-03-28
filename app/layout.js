import "./globals.css";

export const metadata = {
  title: "Pamba App",
  description: "Simplify Your Operations With Effortless Business Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    	<body className="font-manrope bg-background">{children}</body>
    </html>
  );
}
