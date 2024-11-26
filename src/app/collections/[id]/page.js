import React from "react";
import { Container } from "@/components/Container";
import StorageProvider from "@/app/storageProvider";
import Image from 'next/image';
import Link from "next/link";
import { getCollectionsByCategory, getCategoryByID } from "@/lib/collection-data";

import Arrow from "../../../../public/arrow.svg";

export default async function CollectionItems({ params }) {
    const {id} = await params;
    const category = await getCategoryByID(id);
    const collections = await getCollectionsByCategory(id);

    const transform = "?fit=cover&height=130&width=130&format=auto";

    if (collections.error) {
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

    console.log(collections);
    return (
        <>
            <StorageProvider>
                <Container page="items">
                    <main>
                        <section className="px-7 pt-10 pb-3">
                            <h1 className="text-lg font-bold text-base-content mb-5">Category</h1>
                            <h2 className="text-3xl font-bold text-secondary">
                                {category.categoryName}
                            </h2>

                            <p>
                                Select an item to learn more.
                            </p>
                        </section>

                        <section className="px-7 pb-10">
                            <div className="flex flex-col gap-y-9">
                                {collections.map((collection) => (
                                    <Link key={collection.id} href={`/collections/${id}/${collection.id}`} className="flex flex-row gap-4 items-center bg-item-btn-bg pr-3">
                                        <div className="flex-none w-[110px] aspect-square">
                                            <Image
                                                src={`${process.env.FILES_BASE_URL}/${collection.imageEntries[0].ImageEntry_id.image.id}/${collection.imageEntries[0].ImageEntry_id.image.filename_disk}${transform}`}
                                                alt={collection.assetTitle}
                                                width={130}
                                                height={130}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="m-0 text-base font-bold text-item-btn-text leading-tight">
                                                <span dangerouslySetInnerHTML={{ __html: collection.assetTitle }}></span>
                                            </p>
                                        </div>
                                        <div className="flex-none w-4">
                                            <Image src={Arrow} alt="Arrow icon" />
                                        </div>
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