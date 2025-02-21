import { parseTime } from "../../utils";
import { Activity } from "../../globalTypes";

import { colors, LineHeight } from "../../globalStyles";
import styles from  "./styles";

import Text from "../basic/Text";

const weekDays = ["SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA"];

const disciplineColors = [
    colors.lightOrange,
    colors.lightRed,
    colors.lightGreen,
    colors.purple,
    colors.lightBlue,
    colors.gray,
];


 function TimeRangeBlock(props: { startHour:string, endHour:string }) {
    const { startHour, endHour } = props;
    
    const startTime = parseTime(startHour);
    const duration = parseTime(endHour) - startTime;

    const position = {
        height: `${duration*4*LineHeight}rem`,
        top: `${(startTime - 7.5)*4*LineHeight}rem`,
        width: "2.5rem",
        backgroundColor: colors.gray,
    };

    return (
        <div style={{...styles.floatingSlot, ...position }}>
            <Text style="bold" size={8} verticalAlign="middle" horizontalAlign="center" containerStyle={styles.margin}>
              {startHour}<br/>às<br/>{endHour}
            </Text>
        </div>
    );
};


function ActivitySlot(props: { data: Activity }) {
    const { data: slotData } = props;
  
    const startTime = parseTime(slotData.hora_inicio);
    const duration = parseTime(slotData.hora_fim) - startTime;

    if (slotData.posicao < 0) {
        return null;
    };

    const position = {
        height: `${duration*4*LineHeight}rem`,
        top: `${(startTime - 7.5)*4*LineHeight}rem`,
        width: (slotData.posicao === 0) ? "12rem" : "5.75rem",
        marginLeft: (slotData.posicao === 2) ? "6.25rem" : 0,
        marginRight: (slotData.posicao === 1) ? "6.25rem" : 0,
        backgroundColor: (slotData.tipo_atividade === "AULA") ? disciplineColors[slotData.cor] : colors.white,
        border: (slotData.tipo_atividade !== "AULA") ? `0.2rem solid ${disciplineColors[slotData.cor]}` : 0,
    };
    if (slotData.tipo_atividade !== "AULA") {
      return (
          <div style={{...styles.floatingSlot, ...position}}>
              <div style={{...styles.margin}}>
                  <Text style="bold" size={7}>{slotData.tipo_atividade}</Text>
                  <Text size={7}>{slotData.nome_disciplina}</Text>
                  <Text size={7}>{slotData.hora_inicio} às {slotData.hora_fim}</Text>
              </div>
          </div>
      );
    };
    return (
      <div style={{...styles.floatingSlot, ...position}}>
          <div style={{...styles.margin}}>
              <Text style="bold" size={7}>{slotData.nome_disciplina}</Text>
              {(duration < 2) && <Text size={7} style="bold" color={colors.red}>{slotData.hora_inicio} às {slotData.hora_fim}</Text>}
              <Text size={7}>{slotData.docentes}</Text>
          </div>
      </div>
  );
};


export default function Timetable(props: { data: {[key: string]: Activity[]} }) {
  const { data } = props;

  return (
    <div style={styles.container}>
      <div style={styles.timeRangeColumn}>
        <h1 style={{...styles.titleRowBlock, fontSize:"8pt", width: "2.5rem"}}>Horário</h1>
        <div style={styles.slotsColumn}>
          <TimeRangeBlock startHour={"7h30"} endHour={"9h30"} />
          <TimeRangeBlock startHour={"9h45"} endHour={"11h45"} />
          <TimeRangeBlock startHour={"12h"} endHour={"13h15"} />
          <TimeRangeBlock startHour={"13h30"} endHour={"15h30"} />
          <TimeRangeBlock startHour={"15h45"} endHour={"17h45"} />
          <TimeRangeBlock startHour={"18h"} endHour={"20h"} />
        </div>
      </div>
      {weekDays.map((weekDay) => {
        const activities = data[weekDay] || [] as Activity[];
        if (activities) {
          return (
            <div key={weekDay} style={styles.timetableColumn}>
                <h1 style={styles.titleRowBlock}>{weekDay}</h1>
                <div style={styles.slotsColumn}>
                  {activities.map((slot, index) => {
                    return <ActivitySlot key={index} data={slot} />
                  })}
                </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};