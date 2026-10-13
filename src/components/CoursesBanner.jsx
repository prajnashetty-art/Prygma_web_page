import { FaMagnifyingGlass } from 'react-icons/fa6';
import './CoursesBanner.css';

export default function CoursesBanner({ searchTerm, onSearchChange }) {
  return (
    <section className="courses-banner" aria-labelledby="courses-banner-title">
      <div className="courses-banner-content">
        <h1 id="courses-banner-title">Explore our courses</h1>
        <p>Browse live and crash courses crafted by industry experts</p>
        <form className="courses-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <FaMagnifyingGlass aria-hidden="true" />
          <input
            type="search"
            name="courses"
            aria-label="Search courses"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </form>
      </div>
    </section>
  );
}
