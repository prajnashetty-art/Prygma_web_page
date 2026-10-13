import { FaArrowRight, FaCircleCheck } from 'react-icons/fa6';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container-xl">
        <div className="row">
          <div className="hero-content col-12 col-md-8 col-lg-6">
            <p className="hero-kicker"><span /> PRACTICAL LEARNING FOR WHAT'S NEXT</p>
            <h1 id="hero-title">Make your next career move <em>with confidence.</em></h1>
            <p className="hero-description">
              Learn in-demand skills from people who use them every day. Clear lessons, practical projects, and a pace that works for you.
            </p>
            <div className="hero-actions">
              <a className="hero-primary-action" href="#/courses">Explore courses <FaArrowRight aria-hidden="true" /></a>
              <a className="hero-secondary-action" href="#categories">Browse categories</a>
            </div>
            <div className="hero-proof" aria-label="Course benefits">
              <span><FaCircleCheck aria-hidden="true" /> Learn at your own pace</span>
              <span><FaCircleCheck aria-hidden="true" /> Learn by doing</span>
            </div>
          </div>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#categories">A good place to start <span aria-hidden="true">&#8595;</span></a>
    </section>
  );
}
