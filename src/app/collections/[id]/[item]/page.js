import React from "react";
import { Container } from "@/components/Container";
import StorageProvider from "@/app/storageProvider";
import Image from 'next/image';
import Link from "next/link";
import smartquotes from "smartquotes";
import { stripHtml } from "string-strip-html";

import { getCollectionByID, getCollectionsByCategory } from "@/lib/collection-data";

const prevNext = (allCollections, currentID) => {
    const index = allCollections.findIndex((a) => a.id === currentID);
    if (index === -1) {
        return undefined
    }

    let current = allCollections[index];
    let prev = allCollections[index - 1];
    let next = allCollections[index + 1];

    // let first = allCollections[0];
    // let last = allCollections.slice(-1)[0];

    // if (!prev) prev = last;
    // if (!next) next = first;

    return {
        current: current,
        prev: prev,
        next: next
    }
}

export default async function ItemDetail({ params }) {
    const { item } = await params;
    const collection = await getCollectionByID(item);
    const allCollections = await getCollectionsByCategory(collection.category.id);

    const data = prevNext(allCollections, item);
    const transform = "?width=780&format=auto&withoutEnlargement=true";

    if (collection.error) {
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

    const cleanText = (text) => {
        text = text.replace(/<(\/?)b\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gm, "<$1strong$2>");
        text = text.replace(/<(\/?)i\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gm, "<$1em$2>");
        text = text.replace(/(\r\n|\n|\r)/gm, "");
        return smartquotes(text);
    };

    return (
        <>
            <StorageProvider>
                <Container page="detail" back={`/collections/${collection.category.id}`}>
                    <main>
                        <section className="bg-item-detail-bg px-7 pt-10 pb-3">
                            <h1 className="text-3xl font-bold text-secondary" dangerouslySetInnerHTML={{ __html: cleanText(collection.assetTitle) }} />

                            <p role="text" dangerouslySetInnerHTML={{ __html: cleanText(collection.bodyCopy) }}></p>

                            <h2 className="text-lg font-bold text-base-content mb-5">Object Title and Accession Number</h2>

                            <p>{collection.provenance}</p>
                        </section>

                        <section className="pt-10">
                            <div className="flex flex-col gap-y-4 px-7">
                                {collection.imageEntries.map((image) => (
                                    <div key={image.ImageEntry_id.id} className="flex flex-col gap-y-4">
                                        <Image
                                            src={`${process.env.FILES_BASE_URL}/${image.ImageEntry_id.image.id}/${image.ImageEntry_id.image.filename_disk}${transform}`}
                                            alt={image.ImageEntry_id.accessibilityTags ? image.ImageEntry_id.accessibilityTags : 'No description provided for this image.'}
                                            width={500}
                                            height={500}
                                        />

                                        {image.ImageEntry_id.accessibilityDescription ? (
                                            <p>{image.ImageEntry_id.accessibilityDescription}</p>
                                        ) : (
                                            <p>No description provided for this image.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="px-7 pb-7">

                            {data.next && (
                                <p>
                                    <Link href={`/collections/${collection.category.id}/${data.next.id}`} aria-label="Go to next item.">
                                        <button className="btn btn-primary btn-block rounded-none text-xl tracking-wide"  aria-hidden="true">
                                            Next Item
                                        </button>
                                    </Link>
                                </p>
                            )}

                            <p>
                                <Link href={`/collections/${collection.category.id}`} aria-label="Return to all items.">
                                    <button className="btn btn-primary btn-block rounded-none text-xl tracking-wide" aria-hidden="true">
                                        Back to Items
                                    </button>
                                </Link>
                            </p>
                        </section>
                    </main>
                </Container>
            </StorageProvider>
        </>
    );
}