const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//   host: "172.27.129.80",
//   user: "share_user",
//   password: "share_user",
//   database: "testdb",
// });

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "testdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

//Image upload for raise ticket.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(__dirname, "Uploads");
    fs.mkdirSync(uploadDirectory, { recursive: true });
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    const hours = currentDate.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    const time = `${twelveHourFormat.toString().padStart(2, "0")}-${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}-${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")} ${ampm}`;
    const originalFilename = path.parse(file.originalname).name;
    const ext = path.parse(file.originalname).ext;
    const filename = `${formattedDate}_${time}_${originalFilename}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

app.post("/Uploads", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(200).json({
    message: `File uploaded successfully: ${req.file.filename}`,
    filename: req.file.filename,
  });
});

app.post("/api/solutions", (req, res) => {
  const {
    ticket_id,
    solution_by_id,
    solution_by_name,
    status,
    issue_tag_type,
    solution_time,
    sol_desc,
  } = req.body;

  // const image_filename = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO its_solution 
    (ticket_id, solution_by_id, status, issue_tag_type, solution_time, sol_desc, solution_by_name) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      ticket_id,
      solution_by_id,
      status,
      issue_tag_type,
      solution_time,
      sol_desc,
      solution_by_name,
    ],
    (err, result) => {
      if (err) {
        console.error("Error saving solution:", err);
        res.status(500).send("Error saving solution");
        return;
      }
      res.status(200).json({ message: "Solution saved successfully" });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `
  SELECT *
  FROM its_users
  WHERE user_name = ? AND password = ? AND status = 'Active'
`;

  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const { user_id, user_name, password, comp_name, location, user_email } =
        result[0];
      res.status(200).json({
        message: "Logged in successfully.",
        user_id,
        user_name,
        password,
        comp_name,
        location,
        user_email,
      });
    } else {
      res.status(401).send("Invalid credentials.");
    }
  });
});

app.post("/submit", (req, res) => {
  const {
    issuerUserId,
    projectId,
    moduleId,
    categoryId,
    contactNo,
    issueSubject,
    issueDesc,
    createdBy,
    raiserName,
    raiserEmail,
    onBehalfName,
    locnName,
    companyName,
    imageFileName,
  } = req.body;

  const sql =
    "INSERT INTO its_tickets (issuer_id, project_name, module_name, category_name, contact_no, issue_subject, issue_desc, created_by, raiser_name, raiser_email, onbehalf_name, locn_name, company_name, filename) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      issuerUserId,
      projectId,
      moduleId,
      categoryId,
      contactNo,
      issueSubject,
      issueDesc,
      createdBy,
      raiserName,
      raiserEmail,
      onBehalfName,
      locnName,
      companyName,
      imageFileName,
    ],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Data sent successfully!");
    }
  );
});

app.get("/api/tickets", (req, res) => {
  const sql = "SELECT * FROM its_tickets";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }

    const tickets = result.map((ticket) => {
      if (ticket.issue_desc) {
        ticket.issue_desc = ticket.issue_desc.toString("utf8");
      }
      return ticket;
    });

    res.status(200).json(tickets);
  });
});

app.get("/api/employees", (req, res) => {
  const sql = "SELECT * FROM its_users";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    // const userName = result.map((row) => row.user_name);
    res.status(200).json(result);
  });
});

app.get("/api/projects", (req, res) => {
  const sql = "SELECT proj_id, proj_name FROM its_projects";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    // console.log(result);
    // const projectNames = result.map((row) => row.proj_name);
    res.status(200).json(result);
  });
});

app.post("/api/modules", (req, res) => {
  const { projectName } = req.body;
  const sql =
    "SELECT mod_id, mod_name FROM its_modules WHERE proj_id = (SELECT proj_id FROM its_projects WHERE proj_name = ?)";

  db.query(sql, projectName, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      console.log(result);
      return;
    }

    // console.log(result);
    // const moduleNames = result.map((row) => row.mod_name);
    res.status(200).json(result);
  });
});

app.post("/api/categories", (req, res) => {
  const { moduleName } = req.body;
  const sql =
    "SELECT cat_id, cat_name FROM its_category WHERE mod_id = (SELECT mod_id FROM its_modules WHERE mod_name = ?)";

  db.query(sql, moduleName, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    // console.log(result);
    // const categoryNames = result.map((row) => row.cat_name);
    res.status(200).json(result);
  });
});

app.get("/api/ticket-status", (req, res) => {
  const sql = "SELECT * FROM its_status";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.status(200).json(result);
    // console.log(result)
  });
});

app.get("/api/issue-tags", (req, res) => {
  const sql = "SELECT tag_name FROM its_tags";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }

    res.status(200).json(result);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
