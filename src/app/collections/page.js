import React from "react";
import { Container } from "@/components/Container";
import StorageProvider from "@/app/storageProvider";
import Image from 'next/image';
import Link from "next/link";
import { getCategories } from "@/lib/collection-data";

export default async function Collections() {
    const categories = await getCategories();
    const urlBase = process.env.FILES_BASE_URL;

    console.log(categories);

    if (categories.error) {
        return (
            <>
                <StorageProvider>
                    <Container>
                        <h1>Error fetching data</h1>
                    </Container>
                </StorageProvider>
            </>
        );
    }

    return (
        <>
            <StorageProvider>
                <Container page="collections">
                    <main>
                        <section className="px-7 pt-10 pb-4">
                            <h1 className="text-3xl font-bold text-secondary">Select a Category</h1>

                            <p>
                                This text will tell you what to do on this page. It will not be in Latin.
                            </p>
                        </section>

                        <section className="px-7 pb-12">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                                {categories.map((category) => (
                                    <Link key={category.id} href={`/collections/${category.id}`} className="cursor-pointer">
                                        <div className={`p-1 aspect-square flex items-center justify-center`} style={{backgroundColor: category.color}}>
                                            <Image
                                                src={`${urlBase}/${category.icon.id}/${category.icon.filename_disk}`}
                                                alt={`${category.categoryName} icon`}
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                        <h2 className="mt-4 text-center text-lg font-bold text-base-content leading-tight">{category.categoryName}</h2>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </main>

                </Container>
            </StorageProvider>
        </>
    );
}
