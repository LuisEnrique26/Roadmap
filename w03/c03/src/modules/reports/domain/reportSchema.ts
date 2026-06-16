import z from "zod";

export const createReportSchema = z.object({
    title: z.string().min(3, "Title should be at least 3 characters long"),
    location: z.object({
        lat: z.number().min(-90, "Latitude should be between -90 and 90").max(90, "Latitude should be between -90 and 90"),
        lng: z.number().min(-180, "Longitude should be between -180 and 180").max(180, "Longitude should be between -180 and 180")
    }),
    photos: z.array(z.url()).optional().default([]),
    dynamicMetadata: z.record(z.any(), z.any()).optional().default({})
});