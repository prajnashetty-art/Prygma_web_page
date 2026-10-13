import { FaCartShopping, FaClock } from 'react-icons/fa6';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ManualTestingOverview from '../components/ManualTestingOverview';
import courses from '../data/courses';
import './CourseDetailsPage.css';

function CourseBreadcrumb({ course }) {
  return (
    <nav className="course-breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#/courses">Courses</a></li>
        <li aria-current="page">{course.title}</li>
      </ol>
    </nav>
  );
}

export default function CourseDetailsPage({ courseSlug }) {
  const course = courses.find((item) => item.slug === courseSlug);
  const isManualTesting = course?.slug === 'manual-testing-fundamentals';

  if (isManualTesting) {
    return (
      <div className="manual-course-layout">
        <Header />
        <main className="manual-course-page">
          <CourseBreadcrumb course={course} />
          <ManualTestingOverview course={course} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <Header />
      <main className={`course-details-main${isManualTesting ? ' manual-course-main' : ''}`}>
        <div className="course-details-container">
          {course ? (
            <>
            <CourseBreadcrumb course={course} />
            <article className="course-details-card">
              <div
                className="course-details-image"
                role="img"
                aria-label={`${course.title} course`}
                style={{ backgroundImage: `url(https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=1400&q=90)` }}
              />
              <div className="course-details-content">
                <p className="course-details-academy">{course.academy}</p>
                <h1>{course.title}</h1>
                <p className="course-details-description">{course.description}</p>
                <div className="course-details-meta">
                  <span><FaClock aria-hidden="true" /> {course.duration}</span>
                  <span className={`course-level-badge level-${course.level.toLowerCase()}`}>{course.level}</span>
                </div>
                <div className="course-details-purchase">
                  <div className="course-details-price">
                    <strong>{course.price}</strong>
                    <del>{course.oldPrice}</del>
                    <span>{course.discount}</span>
                  </div>
                  <p>One-time payment · Certificate included</p>
                  <a className="course-details-enroll" href="#/register"><FaCartShopping aria-hidden="true" /> Enroll Now</a>
                </div>
              </div>
            </article>
            </>
          ) : (
            <div className="course-details-not-found">
              <h1>Course not found</h1>
              <p>That course may have moved. Browse the current courses to find what you need.</p>
              <a href="#/courses">Browse courses</a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
