const faker = require('faker');
const fs = require('fs');

faker.locale = 'en';

const randomStudentList = n => {
  if (n <= 0) return [];

  const studentList = [];


  Array.from(new Array(n)).forEach(() => {
    let gender = faker.datatype.boolean() ? 'Female' : 'Male';

    const student = {
      id: faker.datatype.uuid(),
      studentID: faker.datatype.number(),
      name: faker.name.findName(),
      gender: gender,
      dayOfBirth: faker.date.between('1997-01-01', '1997-01-05').toDateString(),
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
  const studentList = randomStudentList(70);

  const db = {
    student: studentList,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully')
  })
})();