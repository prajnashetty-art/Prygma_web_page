import { FaBookOpen, FaGlobe, FaGraduationCap, FaChalkboardUser } from 'react-icons/fa6';
import './Statistics.css';

const stats = [
  { value: '5,000+', label: 'Active Learners', Icon: FaBookOpen },
  { value: '20+', label: 'Professional Courses', Icon: FaGraduationCap },
  { value: '5+', label: 'Expert Instructors', Icon: FaChalkboardUser, featured: true }, /*featured property is used to highlight the instructor stat card. */
  { value: '10+', label: 'Countries', Icon: FaGlobe },
];

export default function Statistics() {
  return (
    <section className="statistics-section" aria-labelledby="statistics-title">
      <p className="statistics-eyebrow" id="statistics-title">Growing global learning community</p>
      <div className="statistics-grid">
        {stats.map(({ value, label, Icon, featured }) => (
          <article className={`statistics-card${featured ? ' statistics-card-featured' : ''}`} key={label}>
            <span className="statistics-icon"><Icon aria-hidden="true" /></span>
            <div>
              <p className="statistics-value">{value}</p>
              <p className="statistics-label">{label}</p>
            </div>
          </article>
        ))}
        <p className="statistics-trust"><span aria-hidden="true" />Trusted by learners worldwide</p>
      </div>
    </section>
  );
}
