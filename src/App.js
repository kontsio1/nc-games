import './App.css';
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import { ReviewsList } from './components/ReviewsList';
import { DetailedReviewCard } from './components/DetailedReviewCard';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<ReviewsList/>} ></Route>
          <Route path="/reviews" element={<ReviewsList/>} ></Route>
          <Route path="/reviews/:review_id" element={<DetailedReviewCard/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;