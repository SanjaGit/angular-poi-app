/**
 * Description: A library to query open data sources (wikipedia, openstreetmap, wikimedia...).
 * https://github.com/tbo47/ez-opendata
 */
export const WIKI_COMMONS: "https://commons.wikimedia.org/w/api.php";
export const USER_AGENT: "github.com/tbo47/ez-opendata";
export namespace OPTIONS_WITH_USER_AGENT {
    let headers: {
        'User-Agent': string;
    };
}
export namespace OSM_CATEGORIES {
    let sustenance: string[][];
    let food: string[][];
    let leisure: string[][];
}
export function openstreetmapGetPOIs(bbox?: string, categories?: string[][], timeout?: number): Promise<any>;
export function openstreetmapGetPOIsBbox({ _northEast, _southWest, }: {
    _northEast: any;
    _southWest: any;
}, categories?: string[][]): Promise<any>;
export function getFoodShops({ _northEast, _southWest, }: {
    _northEast: any;
    _southWest: any;
}): Promise<any>;
export function extractDiets(pois: any): [any, any][];
export function openstreetmapExtractDiets(pois: any): [any, any][];
export function openstreetmapGeocoding(q: any, limit?: number): Promise<any>;
export function wikipediaQuery(lat?: number, lon?: number, language?: string, radius?: number, limit?: number): Promise<any>;
export function wikidataQuery(northEast: any, southWest: any, limit?: number): Promise<any>;
export function wikimediaQueryBound(bounds: any, limit?: number): Promise<any>;
export function wikimediaQuery(northEast: any, southWest: any, limit?: number): Promise<any>;
export function wikimediaGetThumbs(pageids: any, orientation: any, value?: number): Promise<any>;
export function wikimediaInfoMultiplePages(pageids: any, orientation: any, value?: number): Promise<any>;
export function wikimediaGetThumb(pageid: any, height: any, width: any): Promise<any>;
export function wikimediaGetAuthor(title: any, pageid: any): Promise<any>;
export function wikimediaGetAuthorLink(name: any, limit?: number): string;
export function wikimediaInfo(pageid: any, thumbWidth?: number): Promise<any>;
export function getLang(): string;
export function wikimediaPicOfTheDay(lang?: string): Promise<string[]>;
