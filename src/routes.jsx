import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./components/mainLayout"
import AddPlayer from "./pages/addPlayer"

function AppRoutes (){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout></MainLayout>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/add-player" element={<AddPlayer />} />
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes

