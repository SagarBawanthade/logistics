import Navbar from "./components/Navbar";
import Head from 'next/head';
import Dashboard from "./components/Dashboard";
import Services from "./components/Services";
import Footer from "./components/Footer";
import About from "./components/About";
import ContactUs from "./components/Contact";



export default function Home() {
  return (
  <>
  <Head>
        <title>Home App</title>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Alike&family=Cinzel:wght@400..900&family=Glory:ital,wght@0,100..800;1,100..800&family=Grenze:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif+Devanagari:wght@100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+BE+VLG:wght@100..400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

</link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Alike&family=Cinzel:wght@400..900&family=Glory:ital,wght@0,100..800;1,100..800&family=Grenze:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif+Devanagari:wght@100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+BE+VLG:wght@100..400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>

      </Head>
    
      <Navbar/>
      <Dashboard/>
      <Services/>
      <About/>
      <ContactUs/>
      <Footer/>
  </>
  );
}
