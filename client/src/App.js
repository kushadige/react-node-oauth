import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context
import { GithubProvider } from './context/GithubContext';
// Pages
import Home from './pages/Home';
import User from './pages/User';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
// Components
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <GithubProvider>
      <Router>
        <main className='min-vh-100 bg-light d-flex flex-column justify-content-between'>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<User />} />
            <Route path='/project/:name' element={<Project />} />
            <Route path='/auth/failure' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </GithubProvider>
  );
}

export default App;
