/*
  FACULDADE DE BOLSO · horário semanal
  ------------------------------------------------------------
  Semestre 2º/2026 · turno noturno (fonte: SUAP/diários).
  dia: 1 = segunda … 5 = sexta
  materia: id em dados/materias.js
*/
window.HORARIO = {
  semestre: "2º/2026",
  turno: "Noturno",
  faixas: [
    { inicio: "19:00", fim: "20:20" },
    { inicio: "21:00", fim: "22:20" }
  ],
  aulas: [
    { dia: 1, faixa: 0, materia: "fis1" },
    { dia: 1, faixa: 1, materia: "qg" },
    { dia: 2, faixa: 0, materia: "cm2" },
    { dia: 2, faixa: 1, materia: "gaal" },
    { dia: 3, faixa: 0, materia: "calc2" },
    { dia: 3, faixa: 1, materia: "fis1" },
    { dia: 4, faixa: 0, materia: "calc2" },
    { dia: 4, faixa: 1, materia: "dt2", local: "Lab. Informática 2 (A104)" },
    { dia: 5, faixa: 0, materia: "gaal" },
    { dia: 5, faixa: 1, materia: "qg" }
  ],
  localPadrao: "Aula 02 (A202)"
};
