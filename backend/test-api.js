process.env.NODE_ENV = 'test';

const app = require('./src/app');
const http = require('http');
const { Server } = require('socket.io');
const { Users, Roles, Categories, Products } = require('./src/models');
const initModels = require('./src/models/initModels');

initModels();

const PORT = 3010;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(method, path, body, headers = {}) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers }
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`http://127.0.0.1:${PORT}${path}`, options);
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { status: response.status, data };
}

async function run() {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });
  app.set('io', io);

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server listening on ${PORT}`);

  const baseURL = `http://127.0.0.1:${PORT}`;
  const results = [];

  const addResult = (name, ok, details) => {
    results.push({ name, ok, details });
  };

  try {
    await require('./src/utils/database').sync({ force: true, logging: false });
    await Roles.bulkCreate([
      { id: 1, name: 'Admin', description: 'Admin' },
      { id: 2, name: 'User', description: 'Client' }
    ]);
    await Categories.bulkCreate([
      { id: 1, name: 'Test Category' }
    ]);

    const userPayload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      phoneNumber: '0999999999',
      identification: '1234567890',
      password: '123123',
      roleId: 2,
      isApproved: true,
      isActive: true
    };

    const adminPayload = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin.user@example.com',
      phoneNumber: '0888888888',
      identification: '0987654321',
      password: '123123',
      roleId: 1,
      isApproved: true,
      isActive: true
    };

    const registerRes = await request('POST', '/api/v1/user', userPayload);
    addResult('POST /api/v1/user', registerRes.status === 201, `status=${registerRes.status}`);

    const adminRegisterRes = await request('POST', '/api/v1/user', adminPayload);
    addResult('POST /api/v1/user (admin)', adminRegisterRes.status === 201, `status=${adminRegisterRes.status}`);

    const loginRes = await request('POST', '/api/v1/login', {
      email: userPayload.email,
      password: userPayload.password
    });
    addResult('POST /api/v1/login', loginRes.status === 200, `status=${loginRes.status}`);

    const adminLoginRes = await request('POST', '/api/v1/login', {
      email: adminPayload.email,
      password: adminPayload.password
    });
    addResult('POST /api/v1/login (admin)', adminLoginRes.status === 200, `status=${adminLoginRes.status}`);

    const userToken = loginRes.data.token;
    const adminToken = adminLoginRes.data.token;
    const authHeaders = { Authorization: `Bearer ${userToken}` };
    const adminAuthHeaders = { Authorization: `Bearer ${adminToken}` };

    const usersRes = await request('GET', '/api/v1/user/all');
    addResult('GET /api/v1/user/all', usersRes.status === 200, `status=${usersRes.status}`);

    const categoriesRes = await request('GET', '/api/v1/categories');
    addResult('GET /api/v1/categories', categoriesRes.status === 200, `status=${categoriesRes.status}`);

    const rolesRes = await request('GET', '/api/v1/roles');
    addResult('GET /api/v1/roles', rolesRes.status === 200, `status=${rolesRes.status}`);

    const productsRes = await request('GET', '/api/v1/products');
    addResult('GET /api/v1/products', productsRes.status === 200, `status=${productsRes.status}`);

    const createdUser = loginRes.data.user;
    const cartRes = await request('GET', `/api/v1/user/${createdUser.id}/cart`);
    addResult('GET /api/v1/user/:id/cart', cartRes.status === 200, `status=${cartRes.status}`);

    const createdProduct = await Products.create({
      title: 'Test Product',
      description: 'A test product',
      price: 10,
      stock: 5,
      categoryId: 1,
      userId: adminLoginRes.data.user.id,
      status: 'active',
      productImgs: ['https://example.com/p.jpg']
    });

    const addCartRes = await request('POST', `/api/v1/user/cart/${cartRes.data[0].id}/product`, {
      productId: createdProduct.id,
      quantity: 1
    }, authHeaders);
    addResult('POST /api/v1/user/cart/:id/product', addCartRes.status === 201, `status=${addCartRes.status}`);

    const updateCartRes = await request('PUT', `/api/v1/user/cart/${cartRes.data[0].id}/product/update`, {
      productId: createdProduct.id,
      quantity: 2
    }, authHeaders);
    addResult('PUT /api/v1/user/cart/:id/product/update', updateCartRes.status === 200, `status=${updateCartRes.status}`);

    const purchaseRes = await request('PUT', `/api/v1/user/${createdUser.id}/purchase`, {}, authHeaders);
    addResult('PUT /api/v1/user/:id/purchase', purchaseRes.status === 200, `status=${purchaseRes.status}`);

    const purchasesRes = await request('GET', `/api/v1/user/${createdUser.id}/purchases`, undefined, authHeaders);
    addResult('GET /api/v1/user/:id/purchases', purchasesRes.status === 200, `status=${purchasesRes.status}`);

    const approveRes = await request('PUT', `/api/v1/user/${createdUser.id}/approve`, { approved: true }, adminAuthHeaders);
    addResult('PUT /api/v1/user/:id/approve', approveRes.status === 200, `status=${approveRes.status}`);

    const activeRes = await request('PUT', `/api/v1/user/${createdUser.id}/active`, { active: true }, adminAuthHeaders);
    addResult('PUT /api/v1/user/:id/active', activeRes.status === 200, `status=${activeRes.status}`);

    const ordersRes = await request('GET', '/api/v1/orders', undefined, adminAuthHeaders);
    addResult('GET /api/v1/orders', ordersRes.status === 200, `status=${ordersRes.status}`);

    const orderStatusRes = await request('PUT', `/api/v1/orders/${purchaseRes.data.id}/status`, { status: 'Entregado' }, adminAuthHeaders);
    addResult('PUT /api/v1/orders/:id/status', orderStatusRes.status === 200, `status=${orderStatusRes.status}`);

    await sleep(500);
  } catch (error) {
    const status = error.response?.status || 'ERR';
    const data = error.response?.data || error.message;
    addResult('Request failed', false, `status=${status} data=${JSON.stringify(data)}`);
  } finally {
    server.close();
  }

  console.log('\nResumen de pruebas de endpoints:');
  results.forEach((r) => {
    console.log(`${r.ok ? 'PASS' : 'FAIL'} - ${r.name}: ${r.details}`);
  });
  const passed = results.filter((r) => r.ok).length;
  const total = results.length;
  console.log(`\nResultado final: ${passed}/${total} pruebas correctas`);
}

run();
