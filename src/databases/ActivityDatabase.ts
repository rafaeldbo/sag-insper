import axios from 'axios';

import { Activity, ActivityData, ActivityDataOrganized } from '../globalTypes';

export function validateActivityData(data: Activity) {;
  const requiredKeys = ["curso", "serie", "turma", "dia_semana", "hora_fim", "hora_inicio", "nome_disciplina", "tipo_atividade", "docentes"];
  const allKeys = [...requiredKeys, "id", "cod_turma", "cor", "posicao"];

  for (const key of requiredKeys) {
    if (!Object.keys(data).includes(key)) {
      return false;
    };
  };
  for (const key in Object.keys(data)) {
    if (!allKeys.includes(key)) {
      return false;
    };
  };
  return true;
};

export function parseActivityData(data: Activity[]) {
  const organizedData: { [key: string]: { [key: string]: Activity[] } } = {};

  data.forEach((activity: Activity) => {
    if (!organizedData[activity.cod_turma]) {
      organizedData[activity.cod_turma] = {};
    }
    if (!organizedData[activity.cod_turma][activity.dia_semana]) {
      organizedData[activity.cod_turma][activity.dia_semana] = [];
    }
    organizedData[activity.cod_turma][activity.dia_semana].push(activity);
  });

  return organizedData;
};

export default class ActivityDatabase {
  private backendURL: string = import.meta.env.VITE_APP_BACKEND_URL as string;
  private endpoint: string = "activity";
  private data : { [key: string]: Activity } = {};
  private setData: React.Dispatch<React.SetStateAction<ActivityDataOrganized>>;
  private setLog: React.Dispatch<React.SetStateAction<{ status: number, message: string }>>;

  constructor(
    setData: React.Dispatch<React.SetStateAction<ActivityDataOrganized>>,
    setLog: React.Dispatch<React.SetStateAction<{ status: number, message: string }>>
  ) {
    this.setData = setData;
    this.setLog = setLog;
  };

  async syncData() {
    return axios.get(`${this.backendURL}/${this.endpoint}/`)
        .then((response) => {
          const data = response.data as Activity[];
          this.data = data.reduce((obj, activity) => {
            obj[activity.id] = activity;
            return obj;
          }, {} as { [key: string]: Activity });
          this.setData(parseActivityData(Object.values(this.data)));
        })
        .catch((error) => {
          console.error('error when syncing data: ', error);
          this.setLog({ status: error.response.status, message: error.response.data });
        });
  };
  
  async create(newData: ActivityData) {
    return axios.post(`${this.backendURL}/${this.endpoint}/`, newData)
    .then((response) => {
      if (response.status !== 200) return response.data;
      const data = response.data as Activity;
      this.data[data.id] = data;
      this.setData(parseActivityData(Object.values(this.data)));
      return data;
    })
    .catch((error) => {
      console.error('error when adding a activity: ', error);
      this.setLog({ status: error.response.status, message: error.response.data });
    });
  };

  async update(id: string, updatingData: Partial<ActivityData>) {
    axios.patch(`${this.backendURL}/${this.endpoint}/${id}/`, updatingData)
      .then((response) => {
        if (response.status !== 200) return response.data;
        const data = response.data as Activity;
        this.data[data.id] = data;
        this.setData(parseActivityData(Object.values(this.data)));
        return data;
      })
      .catch((error) => {
        console.error('error when updating a activity: ', error);
        this.setLog({ status: error.response.status, message: error.response.data });
      });
  };

  async delete(id: string) {
    return axios.delete(`${this.backendURL}/${this.endpoint}/${id}/`)
      .then((response) => {
        if (response.status !== 200) return response.data;
        delete this.data[id];
        this.setData(parseActivityData(Object.values(this.data)));
      })
      .catch((error) => {
        console.error('error when deleting a activity: ', error);
        this.setLog({ status: error.response.status, message: error.response.data });
      });
  };
};