'use client'

import React, { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import Link from "next/link";
import DarkLogo from "../../public/Collected-Logo_Dark@2x.png";
import LightLogo from "../../public/Collected-Logo_Light@2x.png";
import { StorageContext } from "@/app/storageProvider";

export const HomePage = () => {
    const { theme } = useContext(StorageContext);
    const [logo, setLogo] = useState(LightLogo);

    useEffect(() => {
        setLogo(theme === 'dark' ? DarkLogo : LightLogo);
    }, [theme]);

    return (
        <>
            <main>
                <section className="px-7 py-14 bg-neutral-content">
                    <Image src={logo} alt="Collected Logo" suppressHydrationWarning />
                </section>

                <section className="px-7 py-10">
                    <h1 className="text-3xl font-bold text-secondary">Title of the App</h1>

                    <p>
                        The block of text that will go here will serve several functions. 
                        It will not only assist you in understanding the purpose of this app, but your own greater purpose in life as well. 
                        That’s a tall order for this text, but we’re sure our talented writers will accomplish this.
                    </p>

                    <div className="mt-8">
                        <Link href="/collections">
                            <button className="btn btn-primary btn-block rounded-none text-xl tracking-wide">
                                Explore Collections
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
};