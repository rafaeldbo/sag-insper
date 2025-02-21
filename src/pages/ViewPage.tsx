import { useState, useEffect } from "react";

import { ActivityDataOrganized } from "../globalTypes";
import styles from "./styles";
import ActivityDatabase from "../databases/ActivityDatabase";

import Timetable from "../components/Timetable/Timetable";
import DataFilter from "../components/DataFilter/DataFilter";
import Text from "../components/basic/Text";



export default function ViewPage() {
    const [organizedData, setOrganizedData] = useState<ActivityDataOrganized>({});
    const [logData, setLogData] = useState<{ status: number, message: string }>({ status: 0, message: "" });
    const [filter, setFilter] = useState<string>("");
    let database: ActivityDatabase;

    useEffect(() => {
        database = new ActivityDatabase(setOrganizedData, setLogData);
        database.syncData();
    }, []);

    return (
        <div style={styles.container}>
            {(Object.keys(organizedData).length === 0) && <Text style="bold">Carregando...</Text>}
            {(Object.keys(organizedData).length !== 0) && <>
                <DataFilter setData={setFilter}/>
                {(organizedData[filter] !== undefined) &&
                <Timetable data={organizedData[filter]} />}
                {(organizedData[filter] === undefined && filter !== "") &&
                <Text>Não há nenhuma grade registrada para esse filtro</Text>}
            </>}
            {(logData.status !== 0) && <Text>{logData.message}</Text>}
        </div>
    );
}