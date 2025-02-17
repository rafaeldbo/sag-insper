import { getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';

import { db } from '../settings';
import { ActivityData, ActivityDataOrganized } from '../globalTypes';

export function validateActivityData(data: ActivityData) {
  const requiredKeys = ["cod_turma", "curso", "serie", "turma", "dia_semana", "hora_fim", "hora_inicio", "nome_disciplina", "tipo_atividade", "docentes", "cor", "posicao"];

  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      return false;
    };
  };
  return true;
};

export function parseActivityData(data: ActivityData[]) {
  const organizedData: { [key: string]: { [key: string]: ActivityData[] } } = {};

  data.forEach((slot: ActivityData) => {
    if (!organizedData[slot.cod_turma]) {
      organizedData[slot.cod_turma] = {};
    }
    if (!organizedData[slot.cod_turma][slot.dia_semana]) {
      organizedData[slot.cod_turma][slot.dia_semana] = [];
    }
    organizedData[slot.cod_turma][slot.dia_semana].push(slot);
  });

  return organizedData;
};

interface Data {
  data: { [key: string]:  ActivityData };
  lastUpdate: Timestamp;
};

export default class ActivityDatabase {
  private collectionName: string = "activities_raw";
  private collectionID: string = "unique";
  private database: Data = { data: {}, lastUpdate: Timestamp.fromMillis(0) };
  private setData: React.Dispatch<React.SetStateAction<ActivityDataOrganized>>;

  constructor(setData: React.Dispatch<React.SetStateAction<ActivityDataOrganized>>) {
    this.setData = setData;
  };

  private genUniqueID(length:number=10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    while (true) {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
      };
      if (this.database.data[id] === undefined) {
        break;
      };
    };
    return id;
  };

  async syncData() {
    try {
      const docSnapshot = await getDoc(doc(db, this.collectionName, this.collectionID));
      if (docSnapshot.exists()) {
        const dataRaw = docSnapshot.data();
        const data = { data: JSON.parse(dataRaw.data), lastUpdate: dataRaw.last_update };
        this.database = data;
        this.setData(parseActivityData(Object.values(data.data)));
        return ;
      };
    } catch (e) {
      console.error('error when collecting a document: ', e);
      throw e;
    };
  };
  
  async add(newData: ActivityData) {
    try {
      await this.syncData();

      newData.id = this.genUniqueID();
      this.database.data[newData.id] = newData;

      this.database.lastUpdate = Timestamp.now();
      this.setData(parseActivityData(Object.values(this.database.data)));
      
      const docRef = doc(db, this.collectionName, this.collectionID);
      const data = { data: JSON.stringify(this.database.data), last_update: this.database.lastUpdate };
      await updateDoc(docRef, data);
      return docRef.id;
    } catch (e) {
      console.error('error when adding a document: ', e);
      throw e;
    };
  };

  async update(id: string, updatingData: Partial<ActivityData>) {
    try {
      this.syncData()

      this.database.data[id] = { ...this.database.data[id], ...updatingData };

      this.database.lastUpdate = Timestamp.now();
      this.setData(parseActivityData(Object.values(this.database.data)));

      const docRef = doc(db, this.collectionName, this.collectionID);
      const data = { data: JSON.stringify(this.database.data), last_update: this.database.lastUpdate };
      await updateDoc(docRef, data);
      return docRef.id;
    } catch (e) {
      console.error('error when updating a document: ', e);
      throw e;
    };
  };

  async delete(id: string) {
    try {
      this.syncData()

      delete this.database.data[id]

      this.database.lastUpdate = Timestamp.now();
      this.setData(parseActivityData(Object.values(this.database.data)));

      const docRef = doc(db, this.collectionName, this.collectionID);
      const data = { data: JSON.stringify(this.database.data), last_update: this.database.lastUpdate };
      await updateDoc(docRef, data);
      return docRef.id;
    } catch (e) {
      console.error('error when deleting a document: ', e);
      throw e;
    };
  };
};