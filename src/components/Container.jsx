'use client'

import React from "react";
import Image from "next/image";
import homeIcon from "../../public/home-icon.svg";
import categoriesIcon from "../../public/categories-icon.svg";
import backIcon from "../../public/back-icon.svg";
import { useRouter } from 'next/navigation'

import dynamic from 'next/dynamic';
import LoadingThemeButton from '@/components/LoadingThemeButton';
const SetThemeButton = dynamic(() => import('@/components/SetThemeButton'), { ssr: false, loading: () => <LoadingThemeButton />, });

export const Container = (props) => {
    return (
        <>
            <NavBar page={props.page} back={props.back} />
            <main className={`pt-[110px] `}>
                <section>
                    {props.children}
                </section>
            </main>
        </>
    );
}

export const NavBar = ({ page = "home", back=null }) => {
    const router = useRouter();

    // home collections items detail
    let icon, link, alt;
    switch (page) {
        case "home":
            icon = homeIcon;
            link = "/";
            alt = "Home icon";
            break;
        case "collections":
            icon = homeIcon;
            link = "/";
            alt = "Home icon";
            break;
        case "items":
            icon = categoriesIcon;
            link = "/collections";
            alt = "Categories icon";
            break;
        case "detail":
            icon = backIcon;
            link = back;
            alt = "Back icon";
            break;
        default:
            icon = homeIcon;
            link = "/";
            alt = "Home icon";
    }

    const handleClick = () => {
        if (!link) {
            router.back();
        } else {
            router.push(link);
        }
    }

    return (
        <>
            <div className="navbar fixed bg-neutral py-7 px-7 shadow-[0px_9px_15px_0px_rgba(51,51,51,_0.2)]">
                <div className="navbar-start">
                    {page !== "home" && (
                        <button onClick={handleClick}>
                            <Image src={icon} alt={alt} />
                        </button>
                    )}
                </div>
                <div className="navbar-end">
                    <SetThemeButton />
                </div>
            </div>
        </>
    );
}