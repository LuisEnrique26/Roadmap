import type { Request, Response } from "express";
import { createReportSchema } from "./domain/reportSchema.js";
import { TransactionReportModel } from "./domain/TransactionReport.js";

class ReportController {
    public async handleCreate(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = createReportSchema.parse(req.body);
            const inspectorId = req.user?.id;
            if (!inspectorId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const newReport = await TransactionReportModel.create({
                title: validatedData.title,
                inspectorId: inspectorId,
                location: {
                    lat: validatedData.location.lat,
                    lng: validatedData.location.lng
                },
                photos: validatedData.photos,
                dynamicMetadata: validatedData.dynamicMetadata
            });
            
            res.status(201).json({ success: true, data: newReport });
        } catch (error: any) {
            res.status(400).json({ error: error.issues || error.message });
        }
    }
}

export default ReportController;