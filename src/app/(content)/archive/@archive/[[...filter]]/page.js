import { Suspense } from "react";
import FilterHeader from "@/components/FilterHeader";
import FilteredNews from "@/components/FilteredNews";

export default async function ArchiveFilterPage({ params }) {
    const { filter } = await params;

    let selectedYear;
    let selectedMonth;

    if (filter?.length > 0) {
        selectedYear = filter[0];
    }

    if (filter?.length > 1) {
        selectedMonth = filter[1];
    }

    return (
        <>
            <Suspense fallback={<p>Loading filters...</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
            </Suspense>
            <Suspense fallback={<p>Loading news...</p>}>
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
}