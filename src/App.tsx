import ViewPage from './pages/ViewPage';

import GlobalStyles from './globalStyles';

const App: React.FC = () => {
  return (
    <div className="App" style={GlobalStyles.global}>
      <ViewPage />
    </div>
  );
};

export default App;
