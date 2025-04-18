import {Header} from "./components/header/Header.jsx";
import {Welcome} from "./components/welcome/Welcome.jsx";
import {News} from "./components/news/News.jsx";
import {Footer} from "./components/footer/Footer.jsx";
import {Gallery} from "./components/gallery/Gallery.jsx";
import {Contact} from "./components/contact/Contact.jsx";
import {Masters} from "./components/masters/Masters.jsx";
import {NewsFull} from "./components/newsFull/NewsFull.jsx";
const App = () => {
    return (
        <div>
            <Header />
            <Welcome />
            <News />
            <Gallery />
            <Masters />
            <Contact />
            <Footer />
            <NewsFull/>
        </div>
    );
};

export default App;