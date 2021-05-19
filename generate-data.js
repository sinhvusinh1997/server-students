const faker = require('faker');
const fs = require('fs');

faker.locale = 'en';

const randomStudentList = n => {
  if (n <= 0) return [];

  const studentList = [];

  Array.from(new Array(n)).forEach(() => {
    let gender = faker.datatype.boolean() ? 'Female' : 'Male';
    let dayOfBirth = faker.date.between('1995-01-01', '2000-01-05').toDateString().split(" ");

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getDay = dayOfBirth[2];
    let getMonth = months.indexOf(dayOfBirth[1]) + 1;
    const getYear = dayOfBirth[3];

    if (getMonth < 10) {
      getMonth = `0${getMonth}`
    }

    const dayOfBirth = `${getYear}-${getMonth}-${getDay}`;


    const student = {
      id: faker.datatype.uuid(),
      studentID: faker.datatype.number(),
      name: faker.name.findName(),
      gender: gender,
      dayOfBirth: dayOfBirth,
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    studentList.push(student);
  });

  return studentList;
};

(() => {
  const studentList = randomStudentList(24);

  const db = {
    student: studentList,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully')
  })
})();