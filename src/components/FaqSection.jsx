import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FaqSection.css";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "You can purchase a course by clicking the 'Buy Now' or 'Enroll' button on the course page and completing the checkout process with your preferred payment method."
    },
    {
      question: "Do I get lifetime access to the courses?",
      answer:
        "Yes, once you purchase a course, you’ll have lifetime access to all its content, including future updates."
    },
    {
      question: "Will I receive a certificate after completing a course?",
      answer:
        "Yes, upon successful completion, you’ll receive a digital certificate that you can share on LinkedIn or download as a PDF."
    }, 
    {
      question: "Can I access courses on my mobile device?",
      answer:
        "Absolutely. All courses are mobile‑friendly and can be accessed through your phone or tablet using a browser or app."
    }, 
    {
      question: "What materials are included with the course",
      answer:
        "Courses typically include video lectures, downloadable resources, assignments, and quizzes to reinforce learning."
    },
     {
      question: "What payment methods are accepted?",
      answer:
        "We accept major credit/debit cards, UPI, net banking, and popular wallets. Some regions also support PayPal."
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 7‑day money‑back guarantee if you’re not satisfied with the course. Refunds are processed back to your original payment method."
    },
  ];

  const toggleFAQ = (index) => {        /*position of the FAQ item that was clicked, 0 for 1st question, 1 for 2nd question and so on*/
    setActiveIndex(activeIndex === index ? null : index);
  };

   return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className="faq-icon" aria-hidden="true">
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          <div className="faq-answer" style={{ display: activeIndex === index ? "block" : "none" }}>
            {faq.answer}
          </div>
        </div>
      ))}
    </section>
  );
}
