import { FaCartShopping, FaClock, FaEye, FaStar, FaUsers } from 'react-icons/fa6';
import './FeaturedCourses.css';

const courses = [
  {
    title: 'Manual Testing', instructor: 'Priya Sharma', specialty: 'QA Lead', experience: '8+ Years Exp.',
    level: 'Beginner', rating: '4.8', reviews: '2.1K reviews', students: '12,340 students', duration: '20 hours',
    oldPrice: '₹2,999', price: '₹1,499', discount: '50% OFF', image: 'photo-1516321318423-f06f85e504b3',
  },
  {
    title: 'Automation Testing', instructor: 'Rahul Mehta', specialty: 'SDET', experience: '10+ Years Exp.',
    level: 'Intermediate', rating: '4.7', reviews: '1.8K reviews', students: '10,520 students', duration: '30 hours',
    oldPrice: '₹3,999', price: '₹1,999', discount: '50% OFF', image: 'photo-1518770660439-4636190af475',
  },
  {
    title: 'Complete Manual and Automation Testing', instructor: 'Neha Kapoor', specialty: 'QA Architect', experience: '12+ Years Exp.',
    level: 'Advanced', rating: '4.9', reviews: '3.2K reviews', students: '18,760 students', duration: '60 hours',
    oldPrice: '₹5,999', price: '₹2,999', discount: '50% OFF', image: 'photo-1550751827-4bd374c3f58b',
  },
  {
    title: 'API Testing', instructor: 'Vikram Nair', specialty: 'QA Automation Expert', experience: '',
    level: 'Intermediate', rating: '4.6', reviews: '1.5K reviews', students: '9,420 students', duration: '25 hours',
    oldPrice: '₹3,499', price: '₹1,749', discount: '50% OFF', image: 'photo-1558494949-ef010cbdcc31',
  },
  {
    title: 'MySQL for Testers', instructor: 'Anjali Desai', specialty: 'Database Expert', experience: '8+ Years Exp.',
    level: 'Beginner', rating: '4.5', reviews: '1.2K reviews', students: '8,930 students', duration: '18 hours',
    oldPrice: '₹2,499', price: '₹1,299', discount: '48% OFF', image: 'photo-1544383835-bda2bc66a55d',
  },
];

export default function FeaturedCourses() {
  return (
    <section className="featured-courses" aria-labelledby="featured-courses-title">
      <div className="featured-courses-inner">
        <header className="featured-heading">
          <div>
            <h2 id="featured-courses-title"><span>Featured Courses</span></h2>
            <p>Build in-demand skills with our expert-led courses and take your career to the next level.</p>
          </div>
          <a className="all-courses-link" href="#courses">View All Courses <span aria-hidden="true">→</span></a>
        </header>

        <div className="featured-course-grid" id="courses">
          {courses.map((course) => (
            <article className="featured-course-card" key={course.title}>
              <div className="featured-course-image" style={{ backgroundImage: `url(https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=700&q=80)` }} aria-label={`${course.title} course`} role="img" />
              <div className="featured-course-body">
                <h3>{course.title}</h3>
                <div className="featured-instructor">
                  <span className="instructor-avatar" aria-hidden="true">{course.instructor.charAt(0)}</span>
                  <span><strong>{course.instructor}</strong><small>{course.specialty}{course.experience && ` | ${course.experience}`}</small></span>
                  <span className={`course-level level-${course.level.toLowerCase()}`}>{course.level}</span>
                </div>
                <div className="course-rating">
                  <span className="rating-score"><FaStar /> {course.rating}</span>
                  <span>({course.reviews})</span>
                  <span className="course-students"><FaUsers /> {course.students}</span>
                </div>
                <div className="course-duration"><FaClock /> {course.duration}</div>
                <div className="course-price-row">
                  <del>{course.oldPrice}</del><strong>{course.price}</strong><span>{course.discount}</span>
                </div>
                <div className="featured-course-actions">
                  <a href="#course-details" className="preview-course"><FaEye /> View Course</a>
                  <a href="#enroll" className="enroll-course"><FaCartShopping /> Enroll Now</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
