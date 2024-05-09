import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
    pdf: {
        data: Buffer,
        contentType: String,
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("pdf", pdfSchema);


