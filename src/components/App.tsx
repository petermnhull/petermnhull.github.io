import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />}/>
            </Routes>
        </HashRouter>
    )
}

export default App;
