import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">My Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Frontend Developer & UI/UX Enthusiast
          </p>
        </div>
      </header>

      {/* Project Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="h-48 bg-blue-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Project One</h3>
              <p className="text-gray-600">Description of your amazing project goes here.</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Tailwind</span>
              </div>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <div className="h-48 bg-purple-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Project Two</h3>
              <p className="text-gray-600">Another awesome project description here.</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">TypeScript</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Let's Connect</h3>
              <p className="text-blue-100">Interested in working together?</p>
            </div>
            <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'Next.js'].map((skill) => (
              <div key={skill} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;