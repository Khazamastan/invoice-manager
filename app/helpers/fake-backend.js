import _ from 'lodash';
import { Role } from './role';
export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'Finance',
    role: Role.Admin,
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    firstName: 'Normal',
    lastName: 'User',
    role: Role.User,
  },
];

export function configureFakeBackend() {
  const expenses = (localStorage.getItem('expenses') &&
    JSON.parse(localStorage.getItem('expenses'))) || [
      {
        "id": 1,
        "user": 1,
        "description": "Admin Edit",
        "vendor": "xxx",
        "amount": 1000,
        "status": "approved",
        "invoice": "#ADM1",
        "date": "2020-05-01"
      },
      {
        "id": 2,
        "user": 1,
        "description": "Admin Edit",
        "vendor": "xxx",
        "amount": 1000,
        "status": "approved",
        "invoice": "#ADM1",
        "date": "2020-05-01"
      },
      {
        "id": 3,
        "user": 1,
        "description": "Admin Edit",
        "vendor": "xxx",
        "amount": 1000,
        "status": "approved",
        "invoice": "#ADM1",
        "date": "2020-05-01"
      },
      {
        "id": 4,
        "user": 2,
        "description": "desc",
        "vendor": "xxx",
        "amount": 200,
        "invoice": "#1111",
        "date": "2020-05-01",
        "status": "rejected"
      },
      {
        "id": 5,
        "user": 1,
        "description": "",
        "vendor": "xxx",
        "amount": 300,
        "status": "approved",
        "date": "2020-05-03"
      },
      {
        "id": 6,
        "user": 2,
        "description": "",
        "vendor": "xxx",
        "amount": 50,
        "status": "approved",
        "date": "2020-05-04"
      },
      {
        "id": 7,
        "user": 1,
        "description": "",
        "vendor": "xxx",
        "amount": 300,
        "status": "approved",
        "date": "2020-05-03"
      },
      {
        "id": 8,
        "user": 2,
        "description": "",
        "vendor": "xxx",
        "amount": 50,
        "status": "approved",
        "date": "2020-05-04"
      },
      {
        "id": 9,
        "user": 1,
        "description": "",
        "vendor": "xxx",
        "amount": 300,
        "status": "approved",
        "date": "2020-05-03"
      },
      {
        "id": 10,
        "user": 2,
        "description": "",
        "vendor": "xxx",
        "amount": 50,
        "status": "approved",
        "date": "2020-05-04"
      },
      {
        "id": 11,
        "user": 1,
        "description": "",
        "vendor": "xxx",
        "amount": 600,
        "date": "2020-05-05",
        "status": "pending"
      },
      {
        "id": 12,
        "user": 1,
        "description": "AN APP Updated",
        "vendor": "xxx",
        "amount": 100,
        "invoice": "#788",
        "date": "2020-05-06",
        "status": "pending"
      },
      {
        "id": 13,
        "user": 1,
        "description": "DESC",
        "vendor": "xxx",
        "amount": 9000,
        "invoice": "#788",
        "date": "2020-05-07",
        "status": "pending"
      },
      {
        "id": 14,
        "user": 1,
        "description": "NA",
        "vendor": "xxx",
        "amount": 20,
        "invoice": "NA",
        "date": "2020-05-08",
        "status": "pending"
      },
      {
        "description": "Yes new",
        "vendor": "#XX",
        "amount": 123,
        "invoice": "909",
        "date": "2020-05-09",
        "user": 1,
        "id": 15,
        "status": "pending"
      },
      {
        "description": "This is New Vendor",
        "vendor": "Vendor 1",
        "amount": 123,
        "invoice": "#123",
        "date": "2020-05-10",
        "user": 1,
        "id": 16,
        "status": "pending"
      },
      {
        "id": 17,
        "user": 1,
        "description": "NA",
        "vendor": "xxx",
        "amount": 20,
        "invoice": "NA",
        "date": "2020-05-08",
        "status": "pending"
      },
      {
        "description": "Yes new",
        "vendor": "#XX",
        "amount": 123,
        "invoice": "909",
        "date": "2020-05-09",
        "user": 1,
        "id": 18,
        "status": "pending"
      },
      {
        "description": "This is New Vendor",
        "vendor": "Vendor 1",
        "amount": 123,
        "invoice": "#123",
        "date": "2020-05-10",
        "user": 1,
        "id": 19,
        "status": "pending"
      },
      {
        "id": 20,
        "user": 1,
        "description": "NA",
        "vendor": "xxx",
        "amount": 20,
        "invoice": "NA",
        "date": "2020-05-08",
        "status": "pending"
      },
      {
        "description": "Yes new",
        "vendor": "#XX",
        "amount": 123,
        "invoice": "909",
        "date": "2020-05-09",
        "user": 1,
        "id": 21,
        "status": "pending"
      },
      {
        "description": "This is New Vendor",
        "vendor": "Vendor 1",
        "amount": 123,
        "invoice": "#123",
        "date": "2020-05-10",
        "user": 1,
        "id": 22,
        "status": "pending"
      },
      {
        "id": 23,
        "user": 1,
        "description": "NA",
        "vendor": "xxx",
        "amount": 20,
        "invoice": "NA",
        "date": "2020-05-08",
        "status": "pending"
      },
      {
        "description": "Yes new",
        "vendor": "#XX",
        "amount": 123,
        "invoice": "909",
        "date": "2020-05-09",
        "user": 1,
        "id": 24,
        "status": "pending"
      },
      {
        "description": "This is New Vendor",
        "vendor": "Vendor 1",
        "amount": 123,
        "invoice": "#123",
        "date": "2020-05-10",
        "user": 1,
        "id": 25,
        "status": "pending"
      },
      {
        "id": 26,
        "user": 1,
        "description": "NA",
        "vendor": "xxx",
        "amount": 20,
        "invoice": "NA",
        "date": "2020-05-08",
        "status": "pending"
      },
      {
        "description": "Yes new",
        "vendor": "#XX",
        "amount": 123,
        "invoice": "909",
        "date": "2020-05-09",
        "user": 1,
        "id": 27,
        "status": "pending"
      },
      {
        "description": "This is New Vendor",
        "vendor": "Vendor 1",
        "amount": 123,
        "invoice": "#123",
        "date": "2020-05-10",
        "user": 1,
        "id": 28,
        "status": "pending"
      },
      {
        "description": "Normal User Test 2",
        "vendor": "Normal User Test 2",
        "amount": 1234,
        "invoice": "#124",
        "date": "2020-05-11",
        "user": 1,
        "id": 29,
        "status": "approved"
      },
      {
        "description": "PayCheck",
        "vendor": "New One",
        "amount": 800,
        "invoice": "#PC1234",
        "date": "2020-05-12",
        "user": 2,
        "id": 30,
        "status": "rejected"
      },
      {
        "description": "Vendor 2 Pay",
        "vendor": "Vendor 2",
        "amount": 400,
        "invoice": "#PAY1234",
        "date": "2020-05-13",
        "user": 2,
        "id": 31,
        "status": "rejected"
      },
      {
        "description": "Vendor Test  Test",
        "vendor": "#3 Vendor Test ",
        "amount": 380,
        "invoice": "123",
        "date": "2020-05-14",
        "user": 2,
        "id": 32,
        "status": "rejected"
      },
      {
        "description": "1",
        "vendor": "1",
        "amount": 1,
        "invoice": "1",
        "date": "2020-05-15",
        "user": 2,
        "id": 33,
        "status": "approved"
      },
      {
        "description": "Vendor 2 Pay",
        "vendor": "Vendor 2",
        "amount": 400,
        "invoice": "#PAY1234",
        "date": "2020-05-13",
        "user": 2,
        "id": 34,
        "status": "rejected"
      },
      {
        "description": "Vendor Test  Test",
        "vendor": "#3 Vendor Test ",
        "amount": 380,
        "invoice": "123",
        "date": "2020-05-14",
        "user": 2,
        "id": 35,
        "status": "rejected"
      },
      {
        "description": "Vendor 2 Pay",
        "vendor": "Vendor 2",
        "amount": 400,
        "invoice": "#PAY1234",
        "date": "2020-05-13",
        "user": 2,
        "id": 36,
        "status": "rejected"
      },
      {
        "description": "Vendor Test  Test",
        "vendor": "#3 Vendor Test ",
        "amount": 380,
        "invoice": "123",
        "date": "2020-05-14",
        "user": 2,
        "id": 37,
        "status": "rejected"
      },
      {
        "description": "2",
        "vendor": "2",
        "amount": 2,
        "invoice": "2",
        "date": "2020-05-16",
        "user": 2,
        "id": 38,
        "status": "approved"
      },
      {
        "description": "3",
        "vendor": "3",
        "amount": 3,
        "invoice": "3",
        "date": "2020-05-17",
        "user": 2,
        "id": 39,
        "status": "approved"
      },
      {
        "description": "4",
        "vendor": "4",
        "amount": 4,
        "invoice": "4",
        "date": "2020-05-18",
        "user": 2,
        "id": 40,
        "status": "rejected"
      },
      {
        "description": "5",
        "vendor": "5",
        "amount": 5,
        "invoice": "5",
        "date": "2020-05-19",
        "user": 2,
        "id": 41,
        "status": "approved"
      },
      {
        "description": "6",
        "vendor": "6",
        "amount": 6,
        "invoice": "6",
        "date": "2020-05-20",
        "user": 2,
        "id": 42,
        "status": "approved"
      },
      {
        "description": "7",
        "vendor": "7",
        "amount": 7,
        "invoice": "7",
        "date": "2020-05-21",
        "user": 2,
        "id": 43,
        "status": "approved"
      },
      {
        "description": "4",
        "vendor": "4",
        "amount": 4,
        "invoice": "4",
        "date": "2020-05-18",
        "user": 2,
        "id": 44,
        "status": "rejected"
      },
      {
        "description": "5",
        "vendor": "5",
        "amount": 5,
        "invoice": "5",
        "date": "2020-05-19",
        "user": 2,
        "id": 45,
        "status": "approved"
      },
      {
        "description": "6",
        "vendor": "6",
        "amount": 6,
        "invoice": "6",
        "date": "2020-05-20",
        "user": 2,
        "id": 46,
        "status": "approved"
      },
      {
        "description": "7",
        "vendor": "7",
        "amount": 7,
        "invoice": "7",
        "date": "2020-05-21",
        "user": 2,
        "id": 47,
        "status": "approved"
      },
      {
        "description": "8",
        "vendor": "8",
        "amount": 8,
        "invoice": "8",
        "date": "2020-05-22",
        "user": 2,
        "id": 48,
        "status": "approved"
      },
      {
        "description": "8",
        "vendor": "8",
        "amount": 8,
        "invoice": "8",
        "date": "2020-05-22",
        "user": 2,
        "id": 49,
        "status": "approved"
      },
      {
        "description": "8",
        "vendor": "8",
        "amount": 8,
        "invoice": "8",
        "date": "2020-05-22",
        "user": 2,
        "id": 50,
        "status": "approved"
      },
      {
        "description": "8",
        "vendor": "8",
        "amount": 8,
        "invoice": "8",
        "date": "2020-05-22",
        "user": 2,
        "id": 51,
        "status": "approved"
      },
      {
        "description": "8",
        "vendor": "8",
        "amount": 8,
        "invoice": "8",
        "date": "2020-05-22",
        "user": 2,
        "id": 52,
        "status": "approved"
      },
      {
        "description": "8",
        "vendor": "8",
        "amount": 8,
        "invoice": "8",
        "date": "2020-05-22",
        "user": 2,
        "id": 53,
        "status": "approved"
      },
      {
        "description": "1",
        "vendor": "11",
        "amount": 22,
        "invoice": "1",
        "date": "2020-05-23",
        "user": 1,
        "id": 54,
        "status": "pending"
      },
      {
        "description": "12",
        "vendor": "12",
        "amount": 12,
        "invoice": "12",
        "date": "2020-05-24",
        "user": 2,
        "id": 55,
        "status": "approved"
      },
      {
        "description": "13",
        "vendor": "13",
        "amount": 13,
        "invoice": "#13",
        "date": "2020-05-25",
        "user": 2,
        "id": 56,
        "status": "approved"
      },
      {
        "description": "14",
        "vendor": "14",
        "amount": 14,
        "invoice": "#14",
        "date": "2020-05-26",
        "user": 2,
        "id": 57,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-27",
        "user": 2,
        "id": 58,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-28",
        "user": 2,
        "id": 59,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-29",
        "user": 2,
        "id": 60,
        "status": "pending"
      },
      {
        "description": "13",
        "vendor": "13",
        "amount": 13,
        "invoice": "#13",
        "date": "2020-05-25",
        "user": 2,
        "id": 61,
        "status": "approved"
      },
      {
        "description": "14",
        "vendor": "14",
        "amount": 14,
        "invoice": "#14",
        "date": "2020-05-26",
        "user": 2,
        "id": 62,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-27",
        "user": 2,
        "id": 63,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-28",
        "user": 2,
        "id": 64,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-29",
        "user": 2,
        "id": 65,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-30",
        "user": 2,
        "id": 66,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-30",
        "user": 2,
        "id": 67,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-31",
        "user": 2,
        "id": 68,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-05-31",
        "user": 2,
        "id": 69,
        "status": "pending"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-06-01",
        "user": 2,
        "id": 70,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-06-02",
        "user": 2,
        "id": 71,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-06-01",
        "user": 2,
        "id": 72,
        "status": "approved"
      },
      {
        "description": "151",
        "vendor": "15",
        "amount": 515,
        "invoice": "51",
        "date": "2020-06-02",
        "user": 2,
        "id": 73,
        "status": "approved"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-03",
        "user": 1,
        "id": 74,
        "status": "pending"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-04",
        "user": 1,
        "id": 75,
        "status": "pending"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-05",
        "user": 1,
        "id": 76,
        "status": "pending"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-06",
        "user": 1,
        "id": 77,
        "status": "pending"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-07",
        "user": 1,
        "id": 78,
        "status": "pending"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-08",
        "user": 1,
        "id": 79,
        "status": "pending"
      },
      {
        "description": "ADD",
        "vendor": "Test Add",
        "amount": 321,
        "invoice": "#212",
        "date": "2020-06-09",
        "user": 1,
        "id": 80,
        "status": "pending"
      },
      {
        "description": "Test Count",
        "vendor": "Test Count",
        "amount": 213,
        "invoice": "Test Count",
        "date": "2020-06-10",
        "user": 2,
        "id": 81,
        "status": "pending"
      },
      {
        "description": "Test Count",
        "vendor": "Test Count",
        "amount": 213,
        "invoice": "Test Count",
        "date": "2020-06-11",
        "user": 2,
        "id": 82,
        "status": "pending"
      },
      {
        "description": "Test Count",
        "vendor": "Test Count",
        "amount": 213,
        "invoice": "Test Count",
        "date": "2020-06-12",
        "user": 2,
        "id": 83,
        "status": "pending"
      },
      {
        "description": "Test Count",
        "vendor": "Test Count",
        "amount": 213,
        "invoice": "Test Count",
        "date": "2020-06-13",
        "user": 2,
        "id": 84,
        "status": "approved"
      },
      {
        "description": "Test Count",
        "vendor": "Test Count",
        "amount": 213,
        "invoice": "Test Count",
        "date": "2020-06-14",
        "user": 2,
        "id": 85,
        "status": "pending"
      },
      {
        "description": "Test Count",
        "vendor": "Test Count",
        "amount": 213,
        "invoice": "Test Count",
        "date": "2020-06-15",
        "user": 2,
        "id": 86,
        "status": "pending"
      }
    ];

  if (!localStorage.getItem('expenses')) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  const dates = [
    '2020-05-01',
    '2020-05-02',
    '2020-05-03',
    '2020-05-04',
    '2020-05-05',
    '2020-05-06',
    '2020-05-07',
    '2020-05-08',
    '2020-05-09',
    '2020-05-10',
    '2020-05-11',
    '2020-05-12',
    '2020-05-13',
    '2020-05-14',
    '2020-05-15',
    '2020-05-16',
    '2020-05-17',
    '2020-05-18',
    '2020-05-19',
    '2020-05-20',
    '2020-05-21',
    '2020-05-22',
    '2020-05-23',
    '2020-05-24',
    '2020-05-25',
    '2020-05-26',
    '2020-05-27',
    '2020-05-28',
    '2020-05-29',
    '2020-05-30',
    '2020-05-31',
    '2020-06-01',
    '2020-06-02',
    '2020-06-03',
    '2020-06-04',
    '2020-06-05',
    '2020-06-06',
    '2020-06-07',
    '2020-06-08',
    '2020-06-09',
    '2020-06-10',
    '2020-06-11',
    '2020-06-12',
    '2020-06-13',
    '2020-06-14',
    '2020-06-15',
    '2020-06-16',
    '2020-06-17',
    '2020-06-18',
    '2020-06-19',
    '2020-06-20',
    '2020-06-21',
    '2020-06-22',
    '2020-06-23',
    '2020-06-24',
    '2020-06-25',
    '2020-06-26',
    '2020-06-27',
    '2020-06-28',
    '2020-06-29',
    '2020-06-30',
    '2020-07-01',
  ];
  // const x = JSON.parse(localStorage.getItem('expenses'));
  // x.forEach((y, i) => {
  //   y.id = i + 1;
  //   y.status =  y.status || 'pending'
  //   // y.date = dates[i];
  // });
  // localStorage.setItem('expenses', JSON.stringify(x));

  const realFetch = window.fetch;
  // eslint-disable-next-line func-names
  window.fetch = function(url, opts) {
    const authHeader = opts.headers.Authorization;
    const isLoggedIn =
      authHeader && authHeader.startsWith('Bearer fake-jwt-token');
    const roleString = isLoggedIn && authHeader.split('.')[1];
    const role = roleString ? Role[roleString] : null;

    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate - public
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const user = users.find(
            x =>
              x.username === params.username && x.password === params.password,
          );
          if (!user) return error('Username or password is incorrect');
          return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: `fake-jwt-token.${user.role}`,
          });
        }

        // get user by id - admin or user (user can only access their own record)
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
          if (!isLoggedIn) return unauthorised();

          // get id from request url
          const urlParts = url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1]);

          // only allow normal users access to their own record
          const currentUser = users.find(x => x.role === role);
          if (id !== currentUser.id && role !== Role.Admin)
            return unauthorised();

          const user = users.find(x => x.id === id);
          return ok(user);
        }

        // get all users - admin only
        if (url.endsWith('/users') && opts.method === 'GET') {
          if (role !== Role.Admin) return unauthorised();
          return ok(users);
        }

        function getItemsBetweenIndex(list, start, end) {
          return list.slice(start, end);
        }
        if (url.endsWith('/metrics') && opts.method === 'GET') {
          let expenses = JSON.parse(localStorage.getItem('expenses'));
          const { body } = opts;
          const { user, query } = body;
          let start = 0;
          let end = 10;
          const isAdmin = body.user.role === Role.Admin;
            const useExpenses = expenses.filter(
              expense => expense.user == user.id,
            );
            let data = isAdmin ? expenses : useExpenses;
            let groups = []
            const groupBy = _.groupBy(data, 'date');
            groups[0] = ['x'];
            groups[1] = ['Invices by Date'];
            Object.keys(groupBy).forEach(date => {
              groups[0].push(date);
              groups[1].push(groupBy[date].length);
            });

            return ok({
              data: groups,
              total: data.length,
            });
        }

        if (url.endsWith('/expenses') && opts.method === 'GET') {
          let expenses = JSON.parse(localStorage.getItem('expenses'));
          const { body } = opts;
          const { user, query } = body;
          let start = 0;
          let end = 10;
          const isAdmin = body.user.role === Role.Admin;
          if (query && query.all) {
            const useExpenses = expenses.filter(
              expense => expense.user == user.id,
            );
            return ok({
              data: isAdmin ? expenses : useExpenses,
              total: isAdmin ? expenses.length : useExpenses.length,
            });
          }
          if (query && query.page) {
            start = 10 * (query.page - 1);
            end = 10 * query.page;
          }
          if (query && query.search) {
            expenses = expenses.filter(o =>
              _.some(o, v => _.toLower(v).indexOf(query.search) > -1),
            );
          }
          if (body.user.role === Role.Admin) {
            return ok({
              data: getItemsBetweenIndex(expenses, start, end),
              total: expenses.length,
            });
          }
          const useExpenses = expenses.filter(
            expense => expense.user == user.id,
          );

          return ok({
            data: getItemsBetweenIndex(useExpenses, start, end),
            total: useExpenses.length,
          });
        }
        function getUserExpenses(expenses, body) {
          const useExpenses = expenses.filter(
            expense => expense.user == body.user.id,
          );
          return useExpenses;
        }

        if (url.endsWith('/expenses') && opts.method === 'PUT') {
          const { body } = opts;
          const expenses = JSON.parse(localStorage.getItem('expenses'));
          const { expense, user } = body;
          const isAdmin = user.role === Role.Admin;
          if (expense.id) {
            const itemIndex = _.findIndex(expenses, { id: expense.id });
            Object.assign(expenses[itemIndex], expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            return ok({});
          }
          expense.id = expenses.length;
          if(isAdmin) {
            expense.status = 'approved';
          }
          expenses.push(expense);
          localStorage.setItem('expenses', JSON.stringify(expenses));
          return ok({});
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));

        // private helper functions

        function ok(body) {
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(body)),
          });
        }

        function unauthorised() {
          resolve({
            status: 401,
            text: () =>
              Promise.resolve(JSON.stringify({ message: 'Unauthorised' })),
          });
        }

        function error(message) {
          resolve({
            status: 400,
            text: () => Promise.resolve(JSON.stringify({ message })),
          });
        }
      }, 500);
    });
  };
}
