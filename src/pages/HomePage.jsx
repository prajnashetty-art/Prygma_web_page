import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className="hero-banner">
            <Header />
            <hr />
            <Hero />
            <Footer />
        </div>
    );
}
