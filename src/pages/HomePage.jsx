import Header from '../components/Header';
import Hero from '../components/Hero';
import CourseCategories from '../components/CourseCategories';
import FeaturedCourses from '../components/FeaturedCourses';
import WhyChooseUs from '../components/WhyChooseUs';
import Statistics from '../components/Statistics';
import InstructorProfile from '../components/InstructorProfile';
import StudentReview from '../components/StudentReview';
import FAQSection from '../components/FaqSection';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className="hero-banner">
            <Header />
            <Hero />
            <CourseCategories />
            <FeaturedCourses />
            <WhyChooseUs />
            <Statistics />
            <InstructorProfile />
            <StudentReview />
            <FAQSection />
            <Footer />
        </div>
    );
}
