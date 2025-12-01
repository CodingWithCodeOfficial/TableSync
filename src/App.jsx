import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './pages/loading.jsx';

const FoodDisplay = lazy(() => import('./pages/foodDisplay.jsx'));
const TableFoodDisplay = lazy(() => import('./pages/tableFoodDisplay.jsx'))
const FoodAdd = lazy(() => import('./pages/foodAdd.jsx'));
const MenuPage = lazy(() => import('./pages/menuPage.jsx'));


function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/foodadd" element={<FoodAdd />} />
          <Route path="/fooddisplay" element={<FoodDisplay />} />
          <Route path="/tablefooddisplay/:id" element={<TableFoodDisplay />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;