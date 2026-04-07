import axios from "axios";
import getConfig from "../../utils/getConfig";

const REPORTS_BASE_URL = `${import.meta.env.VITE_API_SERVER}/api/v1/reports`;

export const getPrecinctCoverageReport = async (precinctId) => {
    if (precinctId === null || precinctId === undefined || precinctId === "") {
        throw new Error("precinctId is required");
    }

    const response = await axios.get(`${REPORTS_BASE_URL}/precinctCoverage`, {
        ...getConfig(),
        params: {
            precinctId,
        },
    });

    return response.data;
};

export const getLeaderCoverageReport = async ({
    municipalityId,
    districtId,
    leaderGoal,
} = {}) => {
    if (!municipalityId && !districtId) {
        throw new Error("municipalityId or districtId is required");
    }

    const params = {
        leaderGoal: leaderGoal || 10,
    };

    if (municipalityId) {
        params.municipalityId = municipalityId;
    }

    if (districtId) {
        params.districtId = districtId;
    }

    const response = await axios.get(`${REPORTS_BASE_URL}/leaderCoverage`, {
        ...getConfig(),
        params,
    });

    return response.data;
};

const metasReportService = {
    getPrecinctCoverageReport,
    getLeaderCoverageReport,
};

export default metasReportService;
