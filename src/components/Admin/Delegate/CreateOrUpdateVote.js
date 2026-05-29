import axios from "axios";
import getConfig from "../../../utils/getConfig";

const CreateOrUpdateVote = async (citizenID, suffrageValue) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/api/v1/suffrages/registervote`,
        {
            citizenID,
            suffrageValue,
        },
        getConfig(),
    );

    return response?.data;
};

export default CreateOrUpdateVote;

