import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { type, title, description, startDate, endDate, data, generatedBy } = req.body;

    const report = await prisma.report.create({
      data: {
        type,
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        data,
        generatedBy,
        status: "COMPLETED",
      },
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create report",
      error: error.message,
    });
  }
};

// Get all reports (with optional filters)
export const getReports = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    const filters = {};

    if (type) filters.type = type;
    if (startDate || endDate) filters.startDate = { gte: new Date(startDate || "1900-01-01") };
    if (endDate) filters.endDate = { lte: new Date(endDate) };

    const reports = await prisma.report.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch report",
      error: error.message,
    });
  }
};

// Delete a report by ID
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.report.delete({ where: { id } });

    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete report",
      error: error.message,
    });
  }
};
