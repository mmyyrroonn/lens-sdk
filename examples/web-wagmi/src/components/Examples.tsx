import { Link } from 'react-router-dom';

const examples = [
  {
    label: 'Profiles to follow',
    path: '/profiles-to-follow',
  },
  {
    label: 'Profile by ID',
    path: '/profile-by-id',
  },
  {
    label: 'Profile by Handle',
    path: '/profile-by-handle',
  },
];

export function Examples() {
  return (
    <div>
      <h1>@lens-protocol/react - Examples</h1>
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {examples.map(({ path, label }) => (
          <div key={path}>
            <Link to={path}>
              <button>{label}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}