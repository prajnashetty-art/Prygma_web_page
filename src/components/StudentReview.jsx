import React from 'react';
import './StudentReview.css';

const reviews = [
  {
    name: 'Hanna Stanton',
    quote: 'I can invite my friend to study a specific topic together. They took learning to the next level.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    name: 'Levin Sandoval',
    quote: 'What a great learning experience. I had my first day to study learning something so useful in simple ways!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    name: 'Steven Klein',
    quote: "I've been more productive with Prygma and my academic performance is getting better every semester.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    name: 'Maya Patel',
    quote: 'The lessons are clear, practical, and easy to fit into my schedule. I feel more confident every week.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    name: 'Ethan Brooks',
    quote: 'I can learn at my own pace and revisit each topic whenever I need a refresher.',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=96&h=96&q=80',
  },
];

export default function StudentReview() {
  return (
    <section className="student-reviews" aria-labelledby="student-reviews-title">
      <h2 id="student-reviews-title">What our student say<br className="student-reviews-title-break" /> About Us</h2>

      <div className="student-reviews-track" aria-label="Student testimonials">
        {reviews.map((review) => (
          <article className="student-review-card" key={review.name}> /*key ensures React can track each item. */
            <div className="student-review-author">
              <img src={review.image} alt="" loading="lazy" />
              <p><strong>{review.name},</strong> <span>Student</span></p>
            </div>
            <blockquote>“{review.quote}”</blockquote>
          </article>
        ))}
      </div>

      <div className="student-reviews-pagination" aria-hidden="true">
        <span />
        <span className="is-active" />
        <span />
      </div>
    </section>
  );
}
