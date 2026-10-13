const courses = [
  {
    slug: 'manual-testing-fundamentals', title: 'Manual Testing Fundamentals', academy: 'Prygma NextGen',
    oldPrice: '\u20B9 19,100', discount: '50% OFF',
    description: 'Brand new to QA? Start by testing a sample app, writing your first test cases, and learning how to report bugs clearly.',
    duration: '22 hrs', level: 'Beginner', price: '\u20B9 9,550', image: 'photo-1516321318423-f06f85e504b3',
  },
  {
    slug: 'api-testing-with-postman', title: 'API Testing with Postman', academy: 'Prygma NextGen',
    oldPrice: '\u20B9 16,500', discount: '50% OFF',
    description: 'Practice checking how apps talk to each other and make sense of real API responses.',
    duration: '18 hrs', level: 'Intermediate', price: '\u20B9 8,250', image: 'photo-1558494949-ef010cbdcc31',
  },
  {
    slug: 'selenium-automation-with-java', title: 'Selenium Automation with Java', academy: 'Prygma NextGen',
    oldPrice: '\u20B9 24,900', discount: '50% OFF',
    description: 'Turn repeatable checks into reliable automated tests, one step at a time.',
    duration: '32 hrs', level: 'Advanced', price: '\u20B9 12,450', image: 'photo-1518770660439-4636190af475',
  },
  {
    slug: 'playwright-with-typescript', title: 'Playwright with TypeScript', academy: 'Prygma NextGen',
    oldPrice: '\u20B9 21,900', discount: '50% OFF',
    description: 'Build modern browser tests and learn a workflow you can use on real projects.',
    duration: '26 hrs', level: 'Intermediate', price: '\u20B9 10,950', image: 'photo-1516321318423-f06f85e504b3',
  },
];

export function getCoursePath(course) {
  return `#/courses/${course.slug}`;
}

export default courses;
