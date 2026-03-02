import Navbar  from "@/components/Navbar";
import Hero     from "@/components/Hero";
import About    from "@/components/About";
import Services from "@/components/Services";
import Programs from "@/components/Programs";
import Gallery  from "@/components/Gallery";
import Pricing  from "@/components/Pricing";
import BookNow  from "@/components/BookNow";
import Footer   from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Global noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Programs />
        <Gallery />
        <Pricing />
        <BookNow />
      </main>

      <Footer />
    </>
  );
}
