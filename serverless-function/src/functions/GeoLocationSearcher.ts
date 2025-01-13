import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import fetch from 'node-fetch';

interface SearchRequest {
    lat: number;
    lng: number;
    radius?: number;
}

interface OverpassResponse {
    elements: Array<{
        id: number;
        type: string;
        tags?: Record<string, string>;
        center?: { lat: number; lon: number };
        lat?: number;
        lon?: number;
    }>;
}

export async function GeoLocationSearcher(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body = await request.json() as SearchRequest;

        if (!body?.lat || !body?.lng) {
            return {
                status: 400,
                jsonBody: { error: 'Latitude and longitude are required' }
            };
        }

        const radius = body.radius || 500;
        const overpassQuery = `
            [out:json]
            [timeout:25];
            nwr["amenity"="parking"]["access"="yes"](around:${radius},${body.lat},${body.lng});
            out center;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
            context.log(`API request failed with status ${response.status}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to fetch parking data' }
            };
        }

        const data = await response.json() as OverpassResponse;
        const parkingSpaces = data.elements.map(el => ({
            id: el.id,
            type: el.type,
            tags: el.tags || {},
            center: el.center || {
                lat: el.lat!,
                lon: el.lon!
            }
        }));

        return {
            status: 200,
            jsonBody: { parkingSpaces }
        };

    } catch (error) {
        context.log('Error:', error);
        return {
            status: 500,
            jsonBody: { error: 'Internal server error' }
        };
    }
}

app.http('GeoLocationSearcher', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: GeoLocationSearcher
});