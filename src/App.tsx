import { BrowserRouter, Routes, Route } from "react-router-dom";

import ViewPage from './pages/ViewPage';

import GlobalStyles from './globalStyles';

const App: React.FC = () => {
  return (
    <div className="App" style={GlobalStyles.global}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
