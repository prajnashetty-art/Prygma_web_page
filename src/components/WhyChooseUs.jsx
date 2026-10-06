import { FaCertificate, FaClock, FaInfinity, FaLaptopCode, FaUserGraduate } from 'react-icons/fa6';
import './WhyChooseUs.css';

const benefits = [
  { title: 'Expert Instructors', description: 'Learn from industry experts with real-world experience.', icon: FaUserGraduate, color: 'lavender' },
  { title: '24/7 Learning Access', description: 'Study anytime, anywhere at your own pace.', icon: FaClock, color: 'blue' },
  { title: 'Practical Learning & Projects', description: 'Gain hands-on experience with real-world projects.', icon: FaLaptopCode, color: 'green' },
  { title: 'Certificates', description: 'Get industry-recognized certificates after course completion.', icon: FaCertificate, color: 'peach' },
  { title: 'Lifetime Access', description: 'Revisit course content anytime, forever.', icon: FaInfinity, color: 'pink' },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us" aria-labelledby="why-choose-us-title">
      <div className="why-choose-us-inner">
        <header className="why-choose-us-heading">
          <span>Why Choose Us</span>
          <h2 id="why-choose-us-title">Learn Better <em>with Us</em></h2>
          <p>Everything you need to learn, practice and grow — all in one place.</p>
        </header>
        <div className="benefits-grid">
          {benefits.map(({ title, description, icon: Icon, color }) => (
            <article className={`benefit-card benefit-${color}`} key={title}>
              <div className="benefit-icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
