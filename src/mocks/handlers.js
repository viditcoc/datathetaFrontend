import { http, HttpResponse } from 'msw';

const mockEquipmentData = [
  {
    equipment_id: "EQ1",
    equipment_name: "Reactor",
    items: [
      {
        item_id: "R101",
        item_name: "Reactor R101",
        location_name: "Plant A",
        team_name: "Alpha",
      },
      {
        item_id: "R102",
        item_name: "Reactor R102",
        location_name: "Plant B",
        team_name: "Beta",
      },
    ],
  },
  {
    equipment_id: "EQ2",
    equipment_name: "Generator",
    items: [
      {
        item_id: "G201",
        item_name: "Generator G201",
        location_name: "Plant A",
        team_name: "Alpha",
      },
    ],
  },
];


const mockUser = {
  username: "johndoe",
  password: "password123",
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  usertype: "admin",
};

export const handlers = [

  http.get('/api/equipment', () => {
    return HttpResponse.json(mockEquipmentData, { status: 200 });
  }),


  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    const { username, password } = body;

    if (username === mockUser.username && password === mockUser.password) {
      return HttpResponse.json(
        {
          firstname: mockUser.firstname,
          lastname: mockUser.lastname,
          email: mockUser.email,
          usertype: mockUser.usertype,
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }
  }),
];