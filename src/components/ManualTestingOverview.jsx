import { useState } from 'react';
import {
  FaCalendarDays,
  FaArrowRightArrowLeft,
  FaCartShopping,
  FaCertificate,
  FaCheck,
  FaChevronDown,
  FaClipboardCheck,
  FaDesktop,
  FaFileArrowDown,
  FaGraduationCap,
  FaClock,
  FaGlobe,
  FaLaptop,
  FaPlay,
  FaStar,
  FaUser,
  FaUsers,
} from 'react-icons/fa6';
import './ManualTestingOverview.css';

const courseFacts = [
  { icon: FaClock, title: '22 hrs', label: 'Total Duration' },
  { icon: FaPlay, title: 'Self-paced', label: 'Delivery Type' },
  { icon: FaGlobe, title: 'English', label: 'Language' },
  { icon: FaCertificate, title: 'Certificate', label: 'Included' },
];

const courseAudiences = [
  { title: 'Students', description: 'Build essential testing skills and start your QA career.', icon: FaGraduationCap, color: 'students' },
  { title: 'Freshers', description: 'Gain practical knowledge and hands-on experience.', icon: FaUser, color: 'freshers' },
  { title: 'Manual Testers', description: 'Strengthen your testing fundamentals and best practices.', icon: FaLaptop, color: 'manual-testers' },
  { title: 'Career Switchers', description: 'Transition into QA with a structured learning path.', icon: FaArrowRightArrowLeft, color: 'career-switchers' },
  { title: 'QA Professionals', description: 'Refresh concepts and enhance your testing skills.', icon: FaUsers, color: 'qa-professionals' },
];

const courseInclusions = [
  { title: 'Video lessons (on-demand)', detail: 'Learn from expert-led video sessions anytime, anywhere.' },
  { title: 'Downloadable resources (PDFs, templates)', detail: 'Get useful resources to support your learning.' },
  { title: 'Quizzes and practice exercises', detail: 'Apply your knowledge with hands-on exercises.' },
  { title: 'Certificate of completion', detail: 'Receive a certificate after successfully finishing the course.' },
];

const courseCurriculum = [
  { title: 'Introduction to Software Testing', summary: 'Understand the basics of software testing, its importance and the role of a manual tester.', lessons: ['What is Software Testing?', 'Importance of Testing', 'Types of Testing', 'Role of a Manual Tester'] },
  { title: 'Software Development Life Cycle (SDLC)', summary: 'Learn the different phases of SDLC and how testing fits into each phase.', lessons: ['SDLC phases and deliverables', 'Waterfall and Agile approaches', 'Where testing fits in a project'] },
  { title: 'Test Case Design Techniques', summary: 'Learn to write effective test cases and scenarios with real-world examples.', lessons: ['Writing clear test scenarios', 'Equivalence partitioning', 'Boundary value analysis', 'Decision tables'] },
  { title: 'Defect Life Cycle and Reporting', summary: 'Understand how to identify, report and track defects effectively.', lessons: ['What makes a good bug report?', 'Defect states and life cycle', 'Severity, priority and triage'] },
  { title: 'Test Execution and Tracking', summary: 'Learn how to execute test cases and track results.', lessons: ['Preparing for a test run', 'Recording results and evidence', 'Retesting and regression testing'] },
  { title: 'Test Management and Tools (Intro)', summary: 'Get an introduction to popular test management tools.', lessons: ['Organising test cases', 'Tracking work in a test tool', 'Keeping useful test documentation'] },
  { title: 'Real-World Examples and Practice', summary: 'Work on practical examples and hands-on scenarios.', lessons: ['Explore a sample web application', 'Write and run a set of test cases', 'Report and discuss sample defects'] },
  { title: 'Tips for QA Career Growth', summary: 'Explore career opportunities and build a roadmap for growth.', lessons: ['Building a QA portfolio', 'Preparing for interviews', 'Planning your next learning steps'] },
];

export default function ManualTestingOverview({ course }) {
  const [openModules, setOpenModules] = useState([0]);
  const allModulesOpen = openModules.length === courseCurriculum.length;
  const toggleModule = (moduleIndex) => {
    setOpenModules((current) => current.includes(moduleIndex)
      ? current.filter((index) => index !== moduleIndex)
      : [...current, moduleIndex]);
  };
  const toggleAllModules = () => {
    setOpenModules(allModulesOpen ? [] : courseCurriculum.map((_, index) => index));
  };

  return (
    <div className="manual-detail-layout">
      <section className="manual-detail-overview" aria-labelledby="manual-course-title">
      <div className="manual-detail-grid container-fluid row g-4 align-items-start">
      <div className="manual-detail-main col-12 col-md-7">
        <span className="manual-detail-level">Beginner</span>
        <h1 id="manual-course-title">Manual Testing Fundamentals</h1>
        <p className="manual-detail-description">
          Learn to test an app from a user's point of view, write clear test cases, and report bugs a team can fix. We'll start with the basics and practise each skill with realistic examples.
        </p>

        <div className="manual-detail-social-proof">
          <span><FaStar aria-hidden="true" /> 4.6 <small>(320 reviews)</small></span>
          <span><FaUsers aria-hidden="true" /> 1,240 enrolled</span>
        </div>

        <div className="manual-detail-facts row g-3">
          {courseFacts.map(({ icon: Icon, title, label }) => (
            <div className="manual-detail-fact col-6 col-sm-3" key={label}>
              <Icon aria-hidden="true" />
              <span><strong>{title}</strong><small>{label}</small></span>
            </div>
          ))}
        </div>

        <div className="manual-detail-people row align-items-center gy-3">
          <div className="manual-detail-instructor col-12 col-sm-7">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=85"
              alt="Priya Sharma"
            />
            <div>
              <strong>Priya Sharma</strong>
              <span>QA Engineer &amp; Trainer</span>
              <a href="#instructor-profile">View Profile <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="manual-detail-updated col-12 col-sm-5">
            <FaCalendarDays aria-hidden="true" />
            <span><small>Last updated</small><strong>Sep 2025</strong></span>
          </div>
        </div>
      </div>

      <aside className="manual-detail-purchase col-12 col-md-5" aria-label={`Enroll in ${course.title}`}>
        <div
          className="manual-detail-preview"
          role="img"
          aria-label="Course preview: software testing on a laptop"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85)' }}
        >
          <span className="manual-detail-play"><FaPlay aria-hidden="true" /></span>
          <span className="manual-detail-preview-caption">Preview this course</span>
        </div>
        <div className="manual-detail-price-row">
          <del>{course.oldPrice}</del>
          <strong>{course.price}</strong>
          <span>{course.discount}</span>
        </div>
        <p className="manual-detail-offer">Save 50% on the course</p>
        <div className="manual-detail-actions">
          <a className="manual-detail-enroll" href="#/register"><FaCartShopping aria-hidden="true" /> Enroll Now</a>
          <a className="manual-detail-add-cart" href="#/register"><FaCartShopping aria-hidden="true" /> Add to Cart</a>
        </div>
      </aside>
      </div>
      </section>
      <section className="manual-course-about-section">
        <div className="manual-course-about-container container-fluid">
          <div className="row g-4">
            <div className="manual-course-about col-12 col-md-7">
          <h2 id="manual-about-title">About this course</h2>
          <p>
            You'll work through the things testers do every day: check a feature against its requirements, think through different user paths, and keep a clear record of anything that doesn't work.
          </p>
          <div className="manual-course-about-learn">
            <h3>What you’ll learn</h3>
            <ul>
              <li><FaCheck aria-hidden="true" /> See how testing fits into the software development lifecycle</li>
              <li><FaCheck aria-hidden="true" /> Write test cases for the paths people actually take</li>
              <li><FaCheck aria-hidden="true" /> Report bugs with enough detail to reproduce them</li>
              <li><FaCheck aria-hidden="true" /> Practise test design on realistic examples</li>
              <li><FaCheck aria-hidden="true" /> Leave with a repeatable approach to testing new features</li>
            </ul>
          </div>
            </div>
          </div>
        </div>
      
        <div className="manual-course-audience-container container-fluid">
          <h2 id="manual-course-audience-title">Who is this course for?</h2>
          <p>This course is designed for anyone who wants to build a strong foundation in manual testing — whether you are a student, fresher, or a professional looking to start or grow your career in the QA field.</p>
          <div className="row g-3">
            {courseAudiences.map(({ title, description, icon: Icon, color }) => (
              <div className="col-6 col-md-4 col-lg" key={title}>
                <article className={`manual-course-audience-card audience-${color}`}>
                  <span className="manual-course-audience-icon"><Icon aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="manual-course-included-container container-fluid">
          <h2>What's included</h2>
          <div className="manual-course-included-panel">
            <ul className="manual-course-included-list">
              {courseInclusions.map(({ title, detail }) => (
                <li key={title}>
                  <span className="manual-course-included-check"><FaCheck aria-hidden="true" /></span>
                  <span className="manual-course-included-copy"><strong>{title}</strong><small>{detail}</small></span>
                </li>
              ))}
            </ul>
            <div className="manual-course-included-art" aria-hidden="true">
              <span className="manual-included-orb" />
              <div className="manual-included-screen"><FaDesktop /><span><FaPlay /></span></div>
              <div className="manual-included-certificate"><FaFileArrowDown /><FaCertificate /></div>
              <FaLaptop className="manual-included-laptop" />
              <FaClipboardCheck className="manual-included-clipboard" />
            </div>
          </div>
        </div>
      
        <section className="manual-course-curriculum-container container-fluid" aria-labelledby="manual-course-curriculum-title">
          <div className="manual-course-curriculum-heading">
            <div>
              <h2 id="manual-course-curriculum-title">Course Curriculum</h2>
              <p>Explore the complete syllabus of this course</p>
            </div>
            <button type="button" onClick={toggleAllModules} aria-expanded={allModulesOpen}>
              {allModulesOpen ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
          <ol className="manual-course-curriculum-list">
            {courseCurriculum.map(({ title, summary, lessons }, index) => {
              const isOpen = openModules.includes(index);
              const moduleId = `manual-course-module-${index + 1}`;
              return (
                <li className={`manual-course-module${isOpen ? ' is-open' : ''}`} key={title}>
                  <span className="manual-course-module-number" aria-hidden="true">{index + 1}</span>
                  <div className="manual-course-module-card">
                    <button
                      type="button"
                      className="manual-course-module-toggle"
                      aria-expanded={isOpen}
                      aria-controls={moduleId}
                      onClick={() => toggleModule(index)}
                    >
                      <span><strong>{title}</strong><small>{summary}</small></span>
                      <FaChevronDown aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <ol className="manual-course-module-lessons" id={moduleId}>
                        {lessons.map((lesson, lessonIndex) => (
                          <li key={lesson}>
                            <span>{index + 1}.{lessonIndex + 1}</span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </section>
    </div>
  );
}
