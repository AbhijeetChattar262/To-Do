import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
