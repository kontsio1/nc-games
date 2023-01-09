import './App.css';
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import { ReviewsList } from './components/ReviewsList';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/reviews" element={<ReviewsList/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;