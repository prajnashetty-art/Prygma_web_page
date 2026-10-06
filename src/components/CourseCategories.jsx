import { FaArrowRight, FaBookOpen, FaBriefcase, FaBullhorn, FaChartColumn, FaCloud, FaCode, FaPenNib, FaUser, FaUserShield, FaGear, FaRobot } from 'react-icons/fa6';
import './CourseCategories.css';

const categories = [
  { name: 'Software Development', description: 'Learn programming, web development, and more.', count: 24, icon: FaCode, image: 'photo-1498050108023-c5249f4df085' },
  { name: 'Software Testing', description: 'Master manual and automation testing skills.', count: 18, icon: FaGear, image: 'photo-1516321318423-f06f85e504b3' },
  { name: 'Data Science', description: 'Turn data into insights and make smarter decisions.', count: 32, icon: FaChartColumn, image: 'photo-1551288049-bebda4e38f71' },
  { name: 'Artificial Intelligence', description: 'Explore machine learning, deep learning and more.', count: 27, icon: FaRobot, image: 'photo-1677442136019-21780ecad995' },
  { name: 'Cloud Computing', description: 'Learn cloud platforms, DevOps and cloud architecture.', count: 21, icon: FaCloud, image: 'photo-1451187580459-43490279c0fa' },
  { name: 'Cybersecurity', description: 'Learn to protect systems and build secure applications.', count: 19, icon: FaUserShield, image: 'photo-1550751827-4bd374c3f58b' },
  { name: 'Business', description: 'Develop essential business and management skills.', count: 25, icon: FaBriefcase, image: 'photo-1460925895917-afdab827c52f' },
  { name: 'Digital Marketing', description: 'Learn SEO, social media, content marketing and more.', count: 22, icon: FaBullhorn, image: 'photo-1533750349088-cd871a92f312' },
  { name: 'UI/UX Design', description: 'Create beautiful and user-friendly experiences.', count: 16, icon: FaPenNib, image: 'photo-1586717791821-3f44a563fa4c' },
  { name: 'Personal Development', description: 'Improve your mindset, productivity and life skills.', count: 20, icon: FaUser, image: 'photo-1531482615713-2afd69097998' },
];
{/*image: Unsplash photo ID for background images.*/}
export default function CourseCategories() {
  return (
    <section className="course-categories" aria-labelledby="course-categories-title">
      <div className="course-categories-inner">
        <header className="categories-heading">
          <h2 id="course-categories-title">Explore Our <span>Course Categories</span></h2>
        </header>

        <div className="category-grid">
          {categories.map(({ name, description, count, icon: Icon, image }) => (
            <article className="category-card" key={name}>
              <div className="category-image-wrap">
                <img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=600&q=80`} alt="" loading="lazy" />
                <span className="category-icon"><Icon aria-hidden="true" /></span>
              </div>
              <div className="category-content">
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="category-card-footer">
                  <span className="category-course-count"><FaBookOpen aria-hidden="true" /> {count} Courses</span>
                  <a className="category-arrow" href="#" aria-label={`Explore ${name} courses`}><FaArrowRight aria-hidden="true" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
