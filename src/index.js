import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Postings from './pages/Postings';
import Events from './pages/Events';
import MyProfile from './pages/myProfile'
import CardPage from './pages/CardPage'
import NoPage from './pages/NoPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="postings+applications" element={<Postings />} />
          <Route path="events" element={<Events />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="templates" element={<CardPage />} />
          <Route path="*" element={<NoPage />} />
      </Route>
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
