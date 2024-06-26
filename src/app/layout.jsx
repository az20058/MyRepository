import Head  from "next/head";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homenav from "./homenav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
      </Head>
      <body>
        <Homenav/>
        <div className="section">{children}</div>
      </body>
    </html>
  );
}
