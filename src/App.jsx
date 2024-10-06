import Nav from "./components/nav/Nav.jsx";
import Header from "./components/header/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./App.css";
import Education from "./components/education/Education.jsx";
import About from "./components/about/About.jsx";
import Footer from "./components/footer/Footer.jsx";
import { useRef } from "react";
import Experience from "./components/experience/Experience.jsx";
import { Scroller, ScrollerItem } from "./components/scroller/Scroller.jsx";
import { FaReact, FaHtml5, FaCss3, FaJs, FaPython } from "react-icons/fa";
gsap.registerPlugin(useGSAP);

function App() {
    const container = useRef();

    useGSAP(
        () => {
            const timeline = gsap.timeline();
            const menuTween = gsap.fromTo(
                ".menu",
                { opacity: 0, y: -100 },
                { opacity: 1, y: 0 }
            );
            const headerTween = gsap.fromTo(
                ".header",
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0 }
            );
            const educationTween = gsap.fromTo(
                ".education",
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0 }
            );
            const aboutTween = gsap.fromTo(
                ".about",
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0 }
            );
            const scrollerTween = gsap.fromTo(
                ".scroller",
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0 }
            );
            const experienceTween = gsap.fromTo(
                ".experience",
                { opacity: 0, y: -100 },
                { opacity: 1, y: 0 }
            );
            const footerTween = gsap.fromTo(
                ".footer",
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0 }
            );
            timeline.add(menuTween, 0);
            timeline.add(headerTween, 0.5);
            timeline.add(educationTween, 1);
            timeline.add(aboutTween, 1.5);
            timeline.add(scrollerTween, 1.8);
            timeline.add(experienceTween, 2.2);
            timeline.add(footerTween, 2.5);
        },
        { scope: container }
    );
    return (
        <div ref={container} className="container">
            <Nav />
            <Header />
            <main className="main">
                <Education />
                <About />
                <Experience />
                <Scroller>
                    <ScrollerItem>
                        <FaReact />
                    </ScrollerItem>
                    <ScrollerItem>
                        <FaHtml5 />
                    </ScrollerItem>
                    <ScrollerItem>
                        <FaCss3 />
                    </ScrollerItem>
                    <ScrollerItem>
                        <FaJs />
                    </ScrollerItem>
                    <ScrollerItem>
                        <FaPython />
                    </ScrollerItem>
                </Scroller>
            </main>
            <Footer />
        </div>
    );
}

export default App;
