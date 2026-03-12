import type { FormEntry } from "@shared/src/types";
import { COUNTRIES } from "@shared/src/types";

interface CountryDistributionItem {
    countryCode: string;
    countryLabel: string;
    count: number;
};

const countryLabelMap = new Map(COUNTRIES.map((c) => [c.code, c.label]));

export function computeCountryDistribution(entries: ReadonlyArray<FormEntry): CountryDistributionItem[] {
    const frequencyMap = new Map<string, number>();

    for (const entry of entries) {
        const currentCount = frequencyMap.get(entry.count) ?? 0;
        frequencyMap.set(entry.country, currentCount + 1);
    }

    // frequency distribution of entries grouped by country
    const distribution: CountryDistributionItem[] = Array.from(
        frequencyMap.entries()
    ).map(([countryCode, count]) => ({
        countryCode,
        countryLabel: countryLabelMap.get(countryCode) ?? countryCode,
        count,
    }));

    // sort by desc order
    distribution.sort((a, b) => b.count - a.count);
    return distribution;
}