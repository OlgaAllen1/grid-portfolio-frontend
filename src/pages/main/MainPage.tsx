import { RefObject, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Education from "../../components/education/Education";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import Experience from "../../components/experience/Experience";
import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header.js";
import "./MainPage.css";
import { useData } from "../../contexts/useData";
import Skills from "../../components/skills/Skills";
import { RefsMap } from "../../types";

gsap.registerPlugin(useGSAP);

const MainPage = () => {
    const { mainData } = useData();
    const container = useRef<HTMLDivElement>(null);
    const refs: RefsMap = {
        header: useRef<HTMLElement>(null),
        education: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        experience: useRef<HTMLElement>(null),
    };


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
                ".skills",
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
            <Nav logo={mainData.logo} refs={refs} />
            <Header ref={refs.header} {...mainData} />
            <main className="main">
                <Education ref={refs.education} />
                <About ref={refs.about} />
                <Experience ref={refs.experience} />
                <Skills />
            </main>
            <Footer logo={mainData?.logo} />
        </div>
    );
};

export default MainPage;
