
// Частина 1

// Дано рядок у форматі "Student1 - Group1; Student2 - Group2; ..."

let studentsStr =
  'Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія - ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Иванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82';

// Завдання 1
// Заповніть словник, де:
// - ключ – назва групи
// - значення – відсортований масив студентів, які відносяться до відповідної групи

const studentsGroups = {};

// Ваш код починається тут
const students = studentsStr
  .split('; ')
  .map((student) => student.split(' - '));

students.forEach((student) => {
  const studentName = student[0];
  const group = student[1];
  if (!(group in studentsGroups)) {
    studentsGroups[group] = [];
  }
  studentsGroups[group].push(studentName);
});

for (let student in studentsGroups) {
  studentsGroups[student].sort();
}

studentsGroupsOrder = Object.keys(studentsGroups)
  .sort()
  .reduce(function (obj, key) {
    obj[key] = studentsGroups[key];
    return obj;
  }, {});

// Ваш код закінчується тут

// Дано масив з максимально можливими оцінками

let points = [12, 12, 12, 12, 12, 12, 12, 16];

// Завдання 2
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – масив з оцінками студента (заповніть масив випадковими значеннями, використовуючи функцію `randomValue(maxValue: Int) -> Int`)

function randomValue(maxValue) {
  switch (Math.ceil(Math.random() * 5)) {
    case 1:
      return Math.ceil(maxValue * 0.7);
    case 2:
      return Math.ceil(maxValue * 0.9);
    case 3:
    case 4:
    case 5:
      return maxValue;
    default:
      return 0;
  }
}

const studentPoints = {};

// Ваш код починається тут
Object.assign(studentPoints, studentsGroupsOrder);

for (group in studentPoints) {
  const groupPoints = [];
  for (studentPoint of studentPoints[group]) {
    groupPoints.push({
      [studentPoint]: points.map((point) => {
        return randomValue(point);
      }),
    });
  }
  studentPoints[group] = groupPoints;
}

// Ваш код закінчується тут

// Завдання 3
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – сума оцінок студента

var sumPoints = {};
// Ваш код починається тут
Object.assign(sumPoints, studentPoints);
const reducer = (accum, current) => accum + current;

for (group in sumPoints) {
  const groupSumPoints = [];
  for (studentPoint of sumPoints[group]) {
    const studentName = Object.keys(studentPoint)[0];
    const sum = Object.values(studentPoint)[0].reduce(reducer);
    const studentSumPoints = {[studentName]: sum};
    groupSumPoints.push(studentSumPoints);
  }
  sumPoints[group] = groupSumPoints;
}

// Ваш код закінчується тут

// Завдання 4
// Заповніть словник, де:
// - ключ – назва групи
// - значення – середня оцінка всіх студентів групи

const groupAvg = {};

// Ваш код починається тут
Object.assign(groupAvg, sumPoints);

for (group in groupAvg) {
  const groupPoints = [];
  for (studentPoint of groupAvg[group]) {
    groupPoints.push(Object.values(studentPoint)[0]);
  }
  const groupAvgPoint = (
    groupPoints.reduce(reducer) / groupPoints.length
  ).toFixed(2);
  groupAvg[group] = +groupAvgPoint;
}

//console.log(groupAvg);
// Ваш код закінчується тут

// Завдання 5
// Заповніть словник, де:
// - ключ – назва групи
// - значення – масив студентів, які мають >= 60 балів

const passedPerGroup = {};

// Ваш код починається тут
Object.assign(passedPerGroup, sumPoints);

for (group in passedPerGroup) {
  const passedStudents = [];
  for (studentPoint of passedPerGroup[group]) {
    if (Object.values(studentPoint)[0] >= 60) {
      passedStudents.push(Object.keys(studentPoint)[0]);
    }
  }
  passedPerGroup[group] = passedStudents;
}

// Ваш код закінчується тут
