import FloatingHearts from './FloatingHearts';
import MusicPlayer from './MusicPlayer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 relative overflow-hidden">
      <FloatingHearts />
      <MusicPlayer />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
