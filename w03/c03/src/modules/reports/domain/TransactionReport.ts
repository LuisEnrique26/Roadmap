import mongoose, { Schema, Document } from "mongoose";

export interface TransactionReport extends Document {
    title: string;
    inspectorId: string;
    location: {
        lat: number;
        lng: number;
    };
    photos: string[];
    dynamicMetadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionReportSchema = new Schema<TransactionReport>({
    title: {
        type: String,
        required: true,
    },
    inspectorId: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    photos: [{ type: String }],
    dynamicMetadata: {
        type: Schema.Types.Mixed,
        default: {},
    }
}, {
    timestamps: true
});

export const TransactionReportModel = mongoose.model<TransactionReport>("TransactionReport", TransactionReportSchema);