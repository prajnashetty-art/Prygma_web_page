import { FaBookOpen, FaStar, FaUsers } from 'react-icons/fa6';
import './InstructorProfile.css';

const expertise = ['Manual Testing', 'Automation Testing', 'API Testing', 'MySQL'];

export default function InstructorProfile() {
  return (
    <section className="instructor-section" aria-label="Featured instructor">
      <article className="instructor-profile-card">
        <div className="instructor-identity">
          <div className="instructor-photo-wrap">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=85"
              alt="Priya Sharma"
              loading="lazy"
            />
            <span className="instructor-online"><i aria-hidden="true" /> Online</span>
          </div>
          <div className="instructor-bio">
            <h2>Name of Instructor</h2>
            <span className="instructor-role">QA Lead &amp; Trainer</span>
            <p>Specializes in Manual Testing, Automation Testing, API Testing and MySQL, with 8+ years of industry experience.</p>
          </div>
        </div>

        <div className="instructor-expertise">
          <h3>Expertise</h3>
          <ul>
            {expertise.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </div>

        <div className="instructor-stats" aria-label="Instructor statistics">
          <span><FaBookOpen aria-hidden="true" /><strong>12</strong> Courses</span>
          <span><FaUsers aria-hidden="true" /><strong>8.4K</strong> Students</span>
          <span><FaStar aria-hidden="true" /><strong>4.8</strong> Rating</span>
          <a href="#instructor-profile">View Profile <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </section>
  );
}
