const testimonials = [
  {
    name: 'Ahmed Raza',
    role: 'CEO, UrbanBrand Co.',
    body: 'Talha completely transformed our brand visuals. Feels like a million-dollar production on a startup budget. The Meta ads campaign alone tripled our ROAS in the first month.',
  },
  {
    name: 'Sara Khan',
    role: 'Content Creator, 500K Followers',
    body: 'Our reels went from 2K to 200K views after working with Talha. The editing style is sharp, the pacing is perfect, and every frame feels intentional.',
  },
  {
    name: 'Muhammad Ali',
    role: 'Marketing Director, TechPK',
    body: 'One of the best young creatives I have worked with. Speed, creativity, and professionalism that rivals top-tier agencies — at a fraction of the cost.',
  },
  {
    name: 'Zain Malik',
    role: 'Automotive Creator',
    body: 'My car edit hit 500K views in 48 hours. The color grade and sound design were on another level. Talha understood exactly what the audience needed.',
  },
  {
    name: 'Fatima Noor',
    role: 'Brand Manager, Lumos Co.',
    body: 'Working with Talha on our Shopify store was the best investment we made this year. Clean design, fast load times, and our conversion rate jumped 40%.',
  },
  {
    name: 'Omar Sheikh',
    role: 'YouTube Creator, 1M Subscribers',
    body: 'The thumbnails and editing style Talha brought doubled my CTR overnight. He does not just follow trends — he sets them.',
  },
  {
    name: 'Aisha Baig',
    role: 'Startup Founder, NovaBrands',
    body: 'The brand identity Talha built gave us instant credibility. Clients kept asking who designed it. It was the first impression that closed deals.',
  },
  {
    name: 'Hassan Tariq',
    role: 'Independent Filmmaker',
    body: 'Incredible eye for color grading. Talha elevated our short film to festival-submission quality. He understands narrative — not just aesthetics.',
  },
  {
    name: 'Bilal Chaudhry',
    role: 'Restaurant Owner, Lahore',
    body: 'Talha handled our Airbnb listing and our food content from scratch. Bookings went up 60% and the food reels get shared constantly. Exceptional work.',
  },
  {
    name: 'Mariam Siddiqui',
    role: 'E-Commerce Entrepreneur',
    body: 'The Google Ads campaign Talha ran for our store brought in leads we had never reached before. Clear communication, transparent reporting, real results.',
  },
];

function StarRating() {
  return (
    <div className="tc-stars">
      {'★★★★★'}
    </div>
  );
}

function TestimonialCard({ name, role, body }) {
  const initial = name[0];
  return (
    <div className="testi-card-3d">
      <StarRating />
      <div className="tc-header">
        <div className="testi-avatar-sm">{initial}</div>
        <div>
          <div className="tc-name">{name}</div>
          <div className="tc-role">{role}</div>
        </div>
      </div>
      <div className="tc-body">{body}</div>
    </div>
  );
}

function MarqueeColumn({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="testi-marquee-col" style={{ height: '500px', overflow: 'hidden' }}>
      <div
        className={`testi-marquee-inner${reverse ? ' reverse' : ''}`}
        style={{ '--duration': reverse ? '42s' : '36s' }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials3D() {
  // Split testimonials into 4 columns
  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 8);
  const col4 = testimonials.slice(8, 10);

  return (
    <div className="testi-3d-container">
      <div className="testi-3d-inner">
        <MarqueeColumn items={col1} reverse={false} />
        <MarqueeColumn items={col2} reverse={true} />
        <MarqueeColumn items={col3} reverse={false} />
        <MarqueeColumn items={col4} reverse={true} />
      </div>
      <div className="testi-gradient-top" />
      <div className="testi-gradient-bottom" />
      <div className="testi-gradient-left" />
      <div className="testi-gradient-right" />
    </div>
  );
}
