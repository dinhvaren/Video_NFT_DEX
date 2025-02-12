import "../Styles/globals.css";
//INTERNAL IMPORT
import { Footer, NavBar } from "../components/componentsIndex";
const MyApp = ({ Component, pageProps }) => (
    <div>
        <NavBar />
        <Component {...pageProps} />;
        <Footer />
    </div>
);

export default MyApp;