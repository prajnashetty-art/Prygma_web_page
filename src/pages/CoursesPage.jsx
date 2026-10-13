import { useState } from 'react';
import Header from '../components/Header';
import CoursesBanner from '../components/CoursesBanner';
import CourseListing from '../components/CourseListing';
import Footer from '../components/Footer';
import './CoursesPage.css';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="courses-page">
      <Header />
      <main>
        <CoursesBanner searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CourseListing searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
}
