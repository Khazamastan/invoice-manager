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
      id: 1,
      user: 1,
      description: 'Admin Edit',
      vendor: 'xxx',
      amount: 1000,
      status: 'approved',
      invoice: '#ADM1',
      date: '1992-02-02',
    },
    {
      id: 2,
      user: 2,
      description: 'desc',
      vendor: 'xxx',
      amount: 200,
      invoice: '#1111',
      date: '1992-02-02',
      status: 'rejected',
    },
    {
      id: 3,
      user: 1,
      description: '',
      vendor: 'xxx',
      amount: 300,
      status: 'approved',
    },
    {
      id: 4,
      user: 2,
      description: '',
      vendor: 'xxx',
      amount: 50,
      status: 'approved',
    },
    {
      id: 5,
      user: 1,
      description: '',
      vendor: 'xxx',
      amount: 600,
    },
    {
      id: 6,
      user: 1,
      description: 'AN APP Updated',
      vendor: 'xxx',
      amount: 100,
      invoice: '#788',
      date: '1992-02-02',
    },
    {
      id: 7,
      user: 1,
      description: 'DESC',
      vendor: 'xxx',
      amount: 9000,
      invoice: '#788',
      date: '1992-02-02',
    },
    {
      id: 8,
      user: 1,
      description: 'NA',
      vendor: 'xxx',
      amount: 20,
      invoice: 'NA',
      date: '1992-02-02',
    },
    {
      description: 'Yes new',
      vendor: '#XX',
      amount: 123,
      invoice: '909',
      date: '1992-02-02',
      user: 1,
      id: 9,
    },
    {
      description: 'This is New Vendor',
      vendor: 'Vendor 1',
      amount: 123,
      invoice: '#123',
      date: '1992-02-02',
      user: 1,
      id: 10,
    },
    {
      description: 'Normal User Test 2',
      vendor: 'Normal User Test 2',
      amount: 1234,
      invoice: '#124',
      date: '1992-01-02',
      user: 1,
      id: 11,
      status: 'approved',
    },
    {
      description: 'PayCheck',
      vendor: 'New One',
      amount: 800,
      invoice: '#PC1234',
      date: '1992-02-02',
      user: 2,
      id: 12,
      status: 'rejected',
    },
    {
      description: 'Vendor 2 Pay',
      vendor: 'Vendor 2',
      amount: 400,
      invoice: '#PAY1234',
      date: '1992-02-02',
      user: 2,
      id: 13,
      status: 'rejected',
    },
    {
      description: 'Vendor Test  Test',
      vendor: '#3 Vendor Test ',
      amount: 380,
      invoice: '123',
      date: '1992-02-02',
      user: 2,
      id: 14,
      status: 'rejected',
    },
    {
      description: '1',
      vendor: '1',
      amount: 1,
      invoice: '1',
      date: '2020-02-02',
      user: 2,
      id: 15,
      status: 'approved',
    },
    {
      description: '2',
      vendor: '2',
      amount: 2,
      invoice: '2',
      date: '2222-02-22',
      user: 2,
      id: 16,
      status: 'approved',
    },
    {
      description: '3',
      vendor: '3',
      amount: 3,
      invoice: '3',
      date: '2020-03-03',
      user: 2,
      id: 17,
      status: 'approved',
    },
    {
      description: '4',
      vendor: '4',
      amount: 4,
      invoice: '4',
      date: '2020-04-04',
      user: 2,
      id: 18,
      status: 'rejected',
    },
    {
      description: '5',
      vendor: '5',
      amount: 5,
      invoice: '5',
      date: '2020-02-02',
      user: 2,
      id: 19,
      status: 'approved',
    },
    {
      description: '6',
      vendor: '6',
      amount: 6,
      invoice: '6',
      date: '2019-06-06',
      user: 2,
      id: 20,
      status: 'approved',
    },
    {
      description: '7',
      vendor: '7',
      amount: 7,
      invoice: '7',
      date: '2020-07-07',
      user: 2,
      id: 21,
      status: 'approved',
    },
    {
      description: '8',
      vendor: '8',
      amount: 8,
      invoice: '8',
      date: '2020-08-08',
      user: 2,
      id: 22,
      status: 'approved',
    },
    {
      description: '1',
      vendor: '11',
      amount: 22,
      invoice: '1',
      date: '2020-01-01',
      user: 1,
      id: 23,
    },
    {
      description: '12',
      vendor: '12',
      amount: 12,
      invoice: '12',
      date: '2020-12-12',
      user: 2,
      id: 24,
      status: 'approved',
    },
    {
      description: '13',
      vendor: '13',
      amount: 13,
      invoice: '#13',
      date: '2020-12-13',
      user: 2,
      id: 25,
      status: 'approved',
    },
    {
      description: '14',
      vendor: '14',
      amount: 14,
      invoice: '#14',
      date: '2020-02-02',
      user: 2,
      id: 26,
      status: 'approved',
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 27,
      status: 'approved',
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 28,
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 29,
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 30,
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 31,
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 32,
      status: 'approved',
    },
    {
      description: '151',
      vendor: '15',
      amount: 515,
      invoice: '51',
      date: '2020-02-12',
      user: 2,
      id: 33,
      status: 'approved',
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 34,
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 35,
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 36,
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 37,
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 38,
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 39,
    },
    {
      description: 'ADD',
      vendor: 'Test Add',
      amount: 321,
      invoice: '#212',
      date: '2222-02-22',
      user: 1,
      id: 40,
    },
    {
      description: 'Test Count',
      vendor: 'Test Count',
      amount: 213,
      invoice: 'Test Count',
      date: '2020-02-02',
      user: 2,
      id: 41,
    },
    {
      description: 'Test Count',
      vendor: 'Test Count',
      amount: 213,
      invoice: 'Test Count',
      date: '2020-02-02',
      user: 2,
      id: 42,
    },
    {
      description: 'Test Count',
      vendor: 'Test Count',
      amount: 213,
      invoice: 'Test Count',
      date: '2020-02-02',
      user: 2,
      id: 43,
    },
    {
      description: 'Test Count',
      vendor: 'Test Count',
      amount: 213,
      invoice: 'Test Count',
      date: '2020-02-02',
      user: 2,
      id: 44,
      status: 'approved',
    },
    {
      description: 'Test Count',
      vendor: 'Test Count',
      amount: 213,
      invoice: 'Test Count',
      date: '2020-02-02',
      user: 2,
      id: 45,
    },
    {
      description: 'Test Count',
      vendor: 'Test Count',
      amount: 213,
      invoice: 'Test Count',
      date: '2020-02-02',
      user: 2,
      id: 46,
    },
  ];

  if (!localStorage.getItem('expenses')) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // let x = JSON.parse(localStorage.getItem('expenses'));
  // x.forEach((y,i) => {
  //   y.id = i+1;
  // })
  //       localStorage.setItem('expenses', JSON.stringify(x));

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

        if (url.endsWith('/expenses') && opts.method === 'GET') {
          let expenses = JSON.parse(localStorage.getItem('expenses'));
          const { body } = opts;
          const { user, query } = body;
          let start = 0;
          let end = 10;
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
          const expenses = JSON.parse(localStorage.getItem('expenses'));
          const { expense } = opts.body;
          if (expense.id) {
            const itemIndex = _.findIndex(expenses, { id: expense.id });
            Object.assign(expenses[itemIndex], expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            return ok({});
          }
          expense.id = expenses.length;
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
