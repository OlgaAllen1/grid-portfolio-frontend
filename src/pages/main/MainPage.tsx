import { useRef } from "react";
import { FaReact, FaHtml5, FaCss3, FaJs, FaPython } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Education from "../../components/education/Education";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import Experience from "../../components/experience/Experience";
import { Scroller, ScrollerItem } from "../../components/scroller/Scroller";
import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header.js";
import "./MainPage.css";
import { useData } from "../../contexts/useData";

gsap.registerPlugin(useGSAP);

const MainPage = () => {
    const { mainData } = useData();
    const container = useRef<HTMLDivElement>(null);

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
            <Nav logo={mainData.logo} />
            <Header {...mainData} />
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
            <Footer logo={mainData?.logo} />
        </div>
    );
};

export default MainPage;
