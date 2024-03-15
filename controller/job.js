const Job = require("../models/job");

const createJobPost = async (req, res, next) => {
    try {
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;

        const jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId: userId,
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
};

const getJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        const jobDetails = await Job.findById(jobId);

        if (!jobDetails) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        res.json({ data: jobDetails });
    } catch (error) {
        next(error);
    }
};

const updateJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.userId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isJobExists = Job.findOne({ _id: jobId, refUserId: userId });
        // bug in this code

        if (!isJobExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Job.updateOne(
            { _id: jobId, refUserId: userId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    title,
                    description,
                    salary,
                    location,
                    duration,
                    locationType,
                    skills,
                },
            }
        );

        res.json({ message: "Job updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const title = req.query.title || "";
        const jobList = await Job.find(
            { title: { $regex: title, $options: "i" } },
            { companyName: 1, title: 1 }
        );
        res.json({ data: jobList });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createJobPost,
    getJobDetailsById,
    updateJobDetailsById,
    getAllJobs,
};
