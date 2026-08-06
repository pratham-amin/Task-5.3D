
const axios = require("axios");

const BASE_URL = "http://localhost:3000";
const API_BASE = "/api/books";

console.log("SIT725_VALIDATION_TESTS");
console.log(`BASE_URL=${BASE_URL}`);
console.log(`API_BASE=${API_BASE}`);

const uniqueId = "b" + Date.now();
console.log(`INFO| Generated uniqueId=${uniqueId}`);

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0
};


async function test(tag, name, method, path, expectedStatus, payload = null) {
  let actualStatus = 0;

  try {
    const res = await axios({
      method,
      url: BASE_URL + path,
      data: payload
    });
    actualStatus = res.status;
  } catch (err) {
    actualStatus = err.response ? err.response.status : 0;
  }

  const pass = actualStatus === expectedStatus ? "Y" : "N";
  console.log(`TEST|${tag}|${name}|${method}|${path}|expected=${expectedStatus}|actual=${actualStatus}|pass=${pass}`);

  if (pass === "N") failed++;

  // Track coverage
  if (coverageTracker[tag] !== undefined) {
    coverageTracker[tag]++;
  }
}


function makeValidBook(id) {
  return {
    id,
    title: "Valid Title",
    author: "Valid Author",
    year: 2000,
    genre: "Classic",
    summary: "Short summary",
    price: 29.99
  };
}

function makeValidUpdate() {
  return {
    title: "Updated Title",
    author: "Updated Author",
    year: 1999,
    genre: "Fantasy",
    summary: "Updated summary",
    price: 49.99
  };
}

let failed = 0;


(async () => {

  // T01 - Valid create
  await test("CREATE_FAIL", "Valid create", "POST", `${API_BASE}`, 201, makeValidBook(uniqueId));

  // T02 - Duplicate ID
  await test("CREATE_FAIL", "Duplicate ID", "POST", `${API_BASE}`, 409, makeValidBook(uniqueId));

  // T03 - Valid update
  await test("UPDATE_FAIL", "Valid update", "PUT", `${API_BASE}/${uniqueId}`, 200, makeValidUpdate());

  // T04 - Update non-existing
  await test("UPDATE_FAIL", "Update non-existing", "PUT", `${API_BASE}/doesnotexist`, 404, makeValidUpdate());

  // T05 - Missing required field (title)
  const missingTitle = makeValidBook("bMissingTitle");
  delete missingTitle.title;
  await test("REQUIRED", "Missing title", "POST", `${API_BASE}`, 400, missingTitle);

 

  // TYPE validation: year must be number
  const badYear = makeValidBook("bBadYear");
  badYear.year = "not-a-number";
  await test("TYPE", "Year not number", "POST", `${API_BASE}`, 400, badYear);

  // LENGTH validation: title too short
  const shortTitle = makeValidBook("bShortTitle");
  shortTitle.title = "A";
  await test("LENGTH", "Title too short", "POST", `${API_BASE}`, 400, shortTitle);

  // LENGTH validation: summary too long
  const longSummary = makeValidBook("bLongSummary");
  longSummary.summary = "x".repeat(600);
  await test("LENGTH", "Summary too long", "POST", `${API_BASE}`, 400, longSummary);

  // BOUNDARY: year too early
  const earlyYear = makeValidBook("bEarlyYear");
  earlyYear.year = 1400;
  await test("BOUNDARY", "Year too early", "POST", `${API_BASE}`, 400, earlyYear);

  // TEMPORAL: year in the future
  const futureYear = makeValidBook("bFutureYear");
  futureYear.year = new Date().getFullYear() + 5;
  await test("TEMPORAL", "Year in future", "POST", `${API_BASE}`, 400, futureYear);

  // UNKNOWN field on create
  const unknownCreate = makeValidBook("bUnknownCreate");
  unknownCreate.hackerField = "malicious";
  await test("UNKNOWN_CREATE", "Unknown field create", "POST", `${API_BASE}`, 400, unknownCreate);

  // UNKNOWN field on update
  const unknownUpdate = makeValidUpdate();
  unknownUpdate.hackerField = "malicious";
  await test("UNKNOWN_UPDATE", "Unknown field update", "PUT", `${API_BASE}/${uniqueId}`, 400, unknownUpdate);

  // IMMUTABLE: attempt to change id
  const changeId = makeValidUpdate();
  changeId.id = "newId";
  await test("IMMUTABLE", "Attempt id change", "PUT", `${API_BASE}/${uniqueId}`, 400, changeId);

  console.log(`SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${Object.values(coverageTracker).reduce((a, b) => a + b, 0)}`);
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}|TYPE=${coverageTracker.TYPE}|REQUIRED=${coverageTracker.REQUIRED}|BOUNDARY=${coverageTracker.BOUNDARY}|LENGTH=${coverageTracker.LENGTH}|TEMPORAL=${coverageTracker.TEMPORAL}|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );

  process.exit(failed === 0 ? 0 : 1);
})();
