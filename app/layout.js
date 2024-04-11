import "./globals.css";
import Provider from "./context/appQueryProvider/Provider";

export const metadata = {
  title: "Pamba App",
  description: "Simplify Your Operations With Effortless Business Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    	<body className="font-manrope bg-background flex flex-col items-center">
        <div className="mx-auto max-w-screen-xl w-full relative">
          <Provider>
            {children}
          </Provider>
        </div>
      </body>
    </html>
  );
}
