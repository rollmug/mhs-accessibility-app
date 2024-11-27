'use client'

import React, { useRef, useEffect, forwardRef } from 'react';
import Image from "next/image";
import homeIcon from "../../public/home-icon.svg";
import categoriesIcon from "../../public/categories-icon.svg";
import backIcon from "../../public/back-icon.svg";

import dynamic from 'next/dynamic';
import LoadingThemeButton from '@/components/LoadingThemeButton';
import Link from "next/link";
const SetThemeButton = dynamic(() => import('@/components/SetThemeButton'), { ssr: false, loading: () => <LoadingThemeButton />, });

export const Container = (props) => {
    const firstFocusableElementRef = useRef(null);

    return (
        <>
            <NavBar page={props.page} back={props.back} ref={firstFocusableElementRef} />
            <main className={`pt-[110px] max-w-xl mx-auto`}>
                <section>
                    {props.children}
                </section>
            </main>
        </>
    );
}

export const NavBar = forwardRef(({ page = "home", back = null }, ref) => {
    // home collections items detail
    let icon, link, alt;
    switch (page) {
        case "home":
            icon = homeIcon;
            link = "/";
            alt = "Return to Home page.";
            break;
        case "collections":
            icon = homeIcon;
            link = "/";
            alt = "Return to Home page.";
            break;
        case "items":
            icon = categoriesIcon;
            link = "/collections";
            alt = "Return to Categories page.";
            break;
        case "detail":
            icon = backIcon;
            link = back;
            alt = "Return to previous page.";
            break;
        default:
            icon = homeIcon;
            link = "/";
            alt = "Home icon";
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return (
        <>
            <div className="navbar fixed bg-neutral py-7 px-7 shadow-[0px_9px_15px_0px_rgba(51,51,51,_0.2)]">
                <div className="navbar-start">
                    {page !== "home" ? (
                        <Link href={link} ref={ref} tabIndex={1} aria-label={alt}>
                            <Image src={icon} alt={alt} aria-hidden="true" />
                        </Link>
                    ) : (
                        <div ref={ref} tabIndex={1} aria-label="Home Page." className=" opacity-0">
                            <Image src={icon} alt="Home Page." aria-hidden="true" />
                        </div>
                    )}
                </div>
                <div className="navbar-end">
                    <SetThemeButton />
                </div>
            </div>
        </>
    );
});

NavBar.displayName = 'NavBar';