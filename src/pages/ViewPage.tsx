import { useState, useEffect } from "react";

import { ActivityDataOrganized } from "../globalTypes";
import styles from "./styles";
import ActivityDatabase from "../databases/ActivityDatabase";

import ViewTimetable from "../components/ViewTimetable/ViewTimetable";
import ExcelInput from "../components/ReadExcel/ExcelInput";
import DataFilter from "../components/DataFilter/DataFilter";
import Text from "../components/basic/Text";



export default function ViewPage() {
    const [organizedData, setOrganizedData] = useState<ActivityDataOrganized>({});
    const [filter, setFilter] = useState<string>("");
    let database: ActivityDatabase;

    useEffect(() => {
        database = new ActivityDatabase(setOrganizedData);
        database.syncData();
    }, []);

    return (
        <div style={styles.container}>
            {(Object.keys(organizedData).length === 0) && <ExcelInput setData={setOrganizedData} />}
            {(Object.keys(organizedData).length !== 0) && <>
                <DataFilter setData={setFilter}/>
                {(organizedData[filter] !== undefined) &&
                <ViewTimetable data={organizedData[filter]} />}
                {(organizedData[filter] === undefined && filter !== "") &&
                <Text>Não há nenhuma grade registrada para esse filtro</Text>}
            </>}
        </div>
    );
}