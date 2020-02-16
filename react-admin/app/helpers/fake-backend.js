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
    { id: 1, user: 1, description: 'New Year', vendor: 'xxx', amount: 100 },
    { id: 2, user: 2, description: '', vendor: 'xxx', amount: 200 },
    { id: 3, user: 1, description: '', vendor: 'xxx', amount: 300 },
    { id: 4, user: 2, description: '', vendor: 'xxx', amount: 50 },
    { id: 5, user: 1, description: '', vendor: 'xxx', amount: 600 },
    { id: 6, user: 2, description: '', vendor: 'xxx', amount: 100 },
    { id: 7, user: 2, description: '', vendor: 'xxx', amount: 900 },
    { id: 8, user: 2, description: '', vendor: 'xxx', amount: 20 },
  ];

  if (!localStorage.getItem('expenses')) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

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

        if (url.endsWith('/expenses') && opts.method === 'GET') {
          const expenses = JSON.parse(localStorage.getItem('expenses'));
          const { body } = opts;
          if (body.user.role === Role.Admin) {
            return ok(expenses);
          }
          const useExpenses = expenses.filter(
            expense => expense.user == body.user.id,
          );
          return ok(useExpenses);
        }
        function getUserExpenses(body){
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
            expenses[itemIndex] = Object.assign({}, expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            return ok(getUserExpenses(expense));
          }
          expense.id = expenses.length;
          expenses.push(expense);
          localStorage.setItem('expenses', JSON.stringify(expenses));
          return ok(getUserExpenses(expense));
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
