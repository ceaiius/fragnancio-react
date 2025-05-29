import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const cleanedSegments = segments.filter((segment, index) => {
    return !(segment === 'category' && index === 0);
  });

  const buildPath = (upToIndex: number) => {
    return '/' + segments.slice(0, upToIndex + 1).join('/');
  };

  const generateLabel = (segment: string) => {
    return decodeURIComponent(
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    );
  };

  return (
    <nav className="text-sm text-gray-600 mb-2 font-mono">
      <ul className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline text-gray-faded">
            Home
          </Link>
        </li>
        {cleanedSegments.map((segment, displayIndex) => {
          const originalIndex = segments.findIndex(
            (s, i) =>
              s === segment &&
              !cleanedSegments.slice(0, displayIndex).includes(s) &&
              i >= displayIndex
          );

          const path = buildPath(originalIndex);

          return (
            <li key={displayIndex} className="flex items-center space-x-2">
              <span className="mx-1">{'>'}</span>
              {displayIndex === cleanedSegments.length - 1 ? (
                <span className="text-gray-800">{generateLabel(segment)}</span>
              ) : (
                <Link to={path} className="hover:underline text-gray-faded">
                  {generateLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
