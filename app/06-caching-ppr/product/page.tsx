import { Suspense } from "react";

export default function ProductPage() {
    return (
        <>
            <ProductDescription />

            <Suspense fallback={<p>Loading stock information...</p>}>
                <LiveStock />
            </Suspense>
        </>
    );
}