import "dotenv/config";

const BASE_URL = "http://localhost:4000";

let adminToken = "";
let userToken = "";
let doctorToken = "";
let availableDocId = "";
let secondDocId = "";
let testAppointmentId = "";

const results = [];

function recordResult(category, name, passed, details = "") {
  results.push({ category, name, passed, details });
  const status = passed ? " PASS " : " FAIL ";
  console.log(`[${status}] ${category} - ${name}${details ? ` (${details})` : ""}`);
}

async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const contentType = res.headers.get("content-type") || "";
  let data;
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }
  return { status: res.status, ok: res.ok, data };
}

async function runTests() {
  console.log("\n========================================================");
  console.log("   STARTING ENDPOINT VALIDATION FOR PRESCRIPTO API");
  console.log("========================================================\n");

  // 1. Root & Static Endpoints
  try {
    const res = await request(`${BASE_URL}/`);
    recordResult("System", "GET / (Root Healthcheck)", res.data === "API WORKING", res.data);
  } catch (err) {
    recordResult("System", "GET / (Root Healthcheck)", false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/images/doc1.png`);
    recordResult("Static Files", "GET /images/doc1.png (Doctor Photo)", res.status === 200, `HTTP ${res.status}`);
  } catch (err) {
    recordResult("Static Files", "GET /images/doc1.png (Doctor Photo)", false, err.message);
  }

  // 2. Doctor Public Endpoints
  try {
    const res = await request(`${BASE_URL}/api/doctor/list`);
    const passed = res.data.success && Array.isArray(res.data.doctors) && res.data.doctors.length > 0;
    if (passed) {
      // Find an available doctor for booking
      const availableDoc = res.data.doctors.find((d) => d.available) || res.data.doctors[0];
      availableDocId = availableDoc._id;
      secondDocId = res.data.doctors[1]?._id || availableDoc._id;
    }
    recordResult("Doctor Public", "GET /api/doctor/list", passed, `${res.data.doctors?.length || 0} doctors returned`);
  } catch (err) {
    recordResult("Doctor Public", "GET /api/doctor/list", false, err.message);
  }

  // 3. Admin Authentication & Actions
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "krushnachandran33@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Krushna@17";

    const res = await request(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      body: JSON.stringify({ email: adminEmail, password: adminPassword }),
    });
    if (res.data.success && res.data.token) {
      adminToken = res.data.token;
      recordResult("Admin", "POST /api/admin/login (Valid credentials)", true, "Token received");
    } else {
      recordResult("Admin", "POST /api/admin/login (Valid credentials)", false, res.data.message);
    }
  } catch (err) {
    recordResult("Admin", "POST /api/admin/login (Valid credentials)", false, err.message);
  }

  try {
    const res = await request(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      body: JSON.stringify({ email: "wrongadmin@example.com", password: "WrongPassword123" }),
    });
    recordResult("Admin", "POST /api/admin/login (Invalid credentials rejection)", !res.data.success, res.data.message);
  } catch (err) {
    recordResult("Admin", "POST /api/admin/login (Invalid credentials rejection)", false, err.message);
  }

  if (adminToken) {
    try {
      const res = await request(`${BASE_URL}/api/admin/all-doctors`, {
        method: "POST",
        headers: { atoken: adminToken },
        body: JSON.stringify({}),
      });
      recordResult("Admin", "POST /api/admin/all-doctors (authAdmin)", res.data.success, `${res.data.doctors?.length} doctors`);
    } catch (err) {
      recordResult("Admin", "POST /api/admin/all-doctors (authAdmin)", false, err.message);
    }

    try {
      const res = await request(`${BASE_URL}/api/admin/dashboard`, {
        headers: { atoken: adminToken },
      });
      recordResult("Admin", "GET /api/admin/dashboard", res.data.success, `Doctors: ${res.data.dashData?.doctors}`);
    } catch (err) {
      recordResult("Admin", "GET /api/admin/dashboard", false, err.message);
    }

    try {
      const res = await request(`${BASE_URL}/api/admin/appointments`, {
        headers: { atoken: adminToken },
      });
      recordResult("Admin", "GET /api/admin/appointments", res.data.success, `${res.data.appointments?.length} appointments`);
    } catch (err) {
      recordResult("Admin", "GET /api/admin/appointments", false, err.message);
    }
  }

  // 4. User Registration, Login & Actions
  const testUserEmail = `patient_${Date.now()}@example.com`;
  const testUserPassword = "TestPassword123";

  try {
    const res = await request(`${BASE_URL}/api/user/register`, {
      method: "POST",
      body: JSON.stringify({
        name: "Test Patient",
        email: testUserEmail,
        password: testUserPassword,
      }),
    });
    if (res.data.success && res.data.token) {
      userToken = res.data.token;
      recordResult("User", "POST /api/user/register", true, "Account created & token returned");
    } else {
      recordResult("User", "POST /api/user/register", false, res.data.message);
    }
  } catch (err) {
    recordResult("User", "POST /api/user/register", false, err.message);
  }

  try {
    const res = await request(`${BASE_URL}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: testUserEmail,
        password: testUserPassword,
      }),
    });
    recordResult("User", "POST /api/user/login", res.data.success, "Login verified");
  } catch (err) {
    recordResult("User", "POST /api/user/login", false, err.message);
  }

  if (userToken) {
    try {
      const res = await request(`${BASE_URL}/api/user/get-profile`, {
        headers: { token: userToken },
      });
      recordResult("User", "GET /api/user/get-profile", res.data.success, `Name: ${res.data.user?.name}`);
    } catch (err) {
      recordResult("User", "GET /api/user/get-profile", false, err.message);
    }

    try {
      const res = await request(`${BASE_URL}/api/user/update-profile`, {
        method: "POST",
        headers: { token: userToken },
        body: JSON.stringify({
          name: "Test Patient Updated",
          phone: "9876543210",
          dob: "1995-05-15",
          gender: "Male",
          address: JSON.stringify({ line1: "123 Health Ave", line2: "Suite 4B" }),
        }),
      });
      recordResult("User", "POST /api/user/update-profile", res.data.success, res.data.message);
    } catch (err) {
      recordResult("User", "POST /api/user/update-profile", false, err.message);
    }

    if (availableDocId) {
      try {
        const res = await request(`${BASE_URL}/api/user/book-appointment`, {
          method: "POST",
          headers: { token: userToken },
          body: JSON.stringify({
            docId: availableDocId,
            slotDate: `20_09_${Date.now()}`,
            slotTime: "11:00 am",
          }),
        });
        recordResult("User", "POST /api/user/book-appointment", res.data.success, res.data.message);
      } catch (err) {
        recordResult("User", "POST /api/user/book-appointment", false, err.message);
      }

      try {
        const res = await request(`${BASE_URL}/api/user/appointments`, {
          headers: { token: userToken },
        });
        if (res.data.success && res.data.appointments?.length > 0) {
          testAppointmentId = res.data.appointments[0]._id;
          recordResult("User", "GET /api/user/appointments", true, `${res.data.appointments.length} appointment found`);
        } else {
          recordResult("User", "GET /api/user/appointments", false, "No appointments returned");
        }
      } catch (err) {
        recordResult("User", "GET /api/user/appointments", false, err.message);
      }
    }

    if (testAppointmentId) {
      try {
        const res = await request(`${BASE_URL}/api/user/cancel-appointment`, {
          method: "POST",
          headers: { token: userToken },
          body: JSON.stringify({ appointmentId: testAppointmentId }),
        });
        recordResult("User", "POST /api/user/cancel-appointment", res.data.success, res.data.message);
      } catch (err) {
        recordResult("User", "POST /api/user/cancel-appointment", false, err.message);
      }
    }
  }

  // 5. Admin change doctor availability (after booking)
  if (adminToken && secondDocId) {
    try {
      const res = await request(`${BASE_URL}/api/admin/change-availability`, {
        method: "POST",
        headers: { atoken: adminToken },
        body: JSON.stringify({ docId: secondDocId }),
      });
      recordResult("Admin", "POST /api/admin/change-availability", res.data.success, res.data.message);
    } catch (err) {
      recordResult("Admin", "POST /api/admin/change-availability", false, err.message);
    }
  }

  // 6. Doctor Portal Endpoints
  try {
    const res = await request(`${BASE_URL}/api/doctor/login`, {
      method: "POST",
      body: JSON.stringify({
        email: "doctor1@prescripto.com",
        password: "doctor123",
      }),
    });
    if (res.data.success && res.data.token) {
      doctorToken = res.data.token;
      recordResult("Doctor Portal", "POST /api/doctor/login", true, "Doctor authenticated");
    } else {
      recordResult("Doctor Portal", "POST /api/doctor/login", false, res.data.message);
    }
  } catch (err) {
    recordResult("Doctor Portal", "POST /api/doctor/login", false, err.message);
  }

  if (doctorToken) {
    try {
      const res = await request(`${BASE_URL}/api/doctor/profile`, {
        headers: { dtoken: doctorToken },
      });
      recordResult("Doctor Portal", "GET /api/doctor/profile", res.data.success, `Name: ${res.data.profileData?.name}`);
    } catch (err) {
      recordResult("Doctor Portal", "GET /api/doctor/profile", false, err.message);
    }

    try {
      const res = await request(`${BASE_URL}/api/doctor/update-profile`, {
        method: "POST",
        headers: { dtoken: doctorToken },
        body: JSON.stringify({
          fees: 75,
          available: true,
          address: { line1: "New Clinic Road", line2: "Suite 101" },
        }),
      });
      recordResult("Doctor Portal", "POST /api/doctor/update-profile", res.data.success, res.data.message);
    } catch (err) {
      recordResult("Doctor Portal", "POST /api/doctor/update-profile", false, err.message);
    }

    try {
      const res = await request(`${BASE_URL}/api/doctor/dashboard`, {
        headers: { dtoken: doctorToken },
      });
      recordResult("Doctor Portal", "GET /api/doctor/dashboard", res.data.success, `Earnings: $${res.data.dashData?.earnings}`);
    } catch (err) {
      recordResult("Doctor Portal", "GET /api/doctor/dashboard", false, err.message);
    }

    try {
      const res = await request(`${BASE_URL}/api/doctor/appointments`, {
        headers: { dtoken: doctorToken },
      });
      recordResult("Doctor Portal", "GET /api/doctor/appointments", res.data.success, `${res.data.appointments?.length} appointments found`);
    } catch (err) {
      recordResult("Doctor Portal", "GET /api/doctor/appointments", false, err.message);
    }
  }

  console.log("\n========================================================");
  const total = results.length;
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = total - passedCount;
  console.log(`TEST SUMMARY: ${passedCount}/${total} PASSED, ${failedCount} FAILED`);
  console.log("========================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
