export interface ActivityData {
    id?: string;
    cod_turma?: string;
    curso: string;
    serie: number;
    turma: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fim: string;
    nome_disciplina: string;
    tipo_atividade: string;
    docentes: string;
    cor?: number;
    posicao?: number;
};

export interface Activity {
    id: string;
    cod_turma: string;
    curso: string;
    serie: number;
    turma: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fim: string;
    nome_disciplina: string;
    tipo_atividade: string;
    docentes: string;
    cor: number;
    posicao: number;
};

export interface ActivityDataOrganized {
    [key: string]: { [key: string]: Activity[] };
};