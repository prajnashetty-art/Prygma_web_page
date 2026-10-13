import { FaCartShopping, FaClock, FaEye } from 'react-icons/fa6';
import courses, { getCoursePath } from '../data/courses';
import './CourseListing.css';

export default function CourseListing({ searchTerm = '' }) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleCourses = courses.filter((course) => (
    `${course.title} ${course.description} ${course.level}`.toLowerCase().includes(normalizedSearch)
  ));

  return (
    <section className="course-listing" aria-label="Available courses">
      <div className="course-listing-grid">
        {visibleCourses.map((course) => (
          <article className="course-listing-card" key={course.slug}>
            <a
              className="course-listing-image"
              href={getCoursePath(course)}
              style={{ backgroundImage: `url(https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=900&q=85)` }}
              aria-label={`View ${course.title} course details`}
            />
            <div className="course-listing-body">
              <h2>{course.title}</h2>
              <p className="course-academy">{course.academy}</p>
              <p className="course-description">{course.description}</p>
              <div className="course-meta">
                <span><FaClock aria-hidden="true" /> {course.duration}</span>
                <span className={`course-level-badge level-${course.level.toLowerCase()}`}>{course.level}</span>
              </div>
              <div className="course-card-bottom">
                <div className="course-price-row">
                  <strong className="course-listing-price">{course.price}</strong>
                  <del>{course.oldPrice}</del>
                  <span>{course.discount}</span>
                </div>
                <p className="course-payment-note">One-time payment · Certificate included</p>
                <div className="course-listing-actions">
                  <a className="course-view-action" href={getCoursePath(course)}><FaEye aria-hidden="true" /> View Course Details</a>
                  <a className="course-enroll-action" href="#/register"><FaCartShopping aria-hidden="true" /> Enroll Now</a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {visibleCourses.length === 0 && (
        <p className="course-search-empty" role="status">
          No courses match “{searchTerm}”. Try another title or keyword.
        </p>
      )}
    </section>
  );
}
