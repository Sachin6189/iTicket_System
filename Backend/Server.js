const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const moment = require("moment-timezone");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "172.27.129.80",
  user: "share_user",
  password: "share_user",
  database: "testdb",
});

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "testdb",
// });

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const sql =
    "SELECT * FROM its_users WHERE user_name = ? AND password = ? AND status = 'Active'";

  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    // console.log(result);
    if (result.length > 0) {
      const { user_id, user_name } = result[0];
      res
        .status(200)
        .json({ message: "Logged in successfully.", user_id, user_name });
    } else {
      res.status(401).send("Invalid credentials.");
    }
  });
});

// app.post("/submit", (req, res) => {
//   const {
//     selectedEmployee,
//     empID,
//     selectedProject,
//     selectedModule,
//     selectedCategory,
//     contact,
//     issueTitle,
//     description,
//     imageData,
//   } = req.body;

//   const raisedTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const randomId = Math.floor(Math.random() * 9000 + 1000);

//   const onBehalfValue = selectedEmployee ? selectedEmployee.value : null;

//   const sql =
//     "INSERT INTO it_tickets (ticket_id, on_behalf,emp_id, project_name, module_name, category, contact, issue_title, description, image_data, raised_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//   db.query(
//     sql,
//     [
//       randomId,
//       onBehalfValue,
//       empID,
//       selectedProject.value,
//       selectedModule.value,
//       selectedCategory.value,
//       contact,
//       issueTitle,
//       description,
//       imageData,
//       raisedTime,
//     ],
//     (err, result) => {
//       if (err) throw err;
//       res.status(200).send("Data sent successfully!");
//     }
//   );
// });

// app.get("/it_tickets", (req, res) => {
//   const sql = `
//   SELECT 
//   it_tickets.ticket_id,
//   it_tickets.on_behalf,
//   it_tickets.emp_id,
//   users.emp_name AS raised_by,
//   it_tickets.project_name,
//   it_tickets.module_name,
//   it_tickets.category,
//   it_tickets.contact,
//   it_tickets.issue_title,
//   it_tickets.description,
//   it_tickets.image_data,
//   it_tickets.raised_time,
//   it_reply.ticket_status,
//   it_reply.support_person,
//   it_reply.approval_reqd,
//   it_reply.approver_id
//   FROM it_tickets
//   LEFT JOIN it_reply ON it_tickets.ticket_id = it_reply.ticket_id
//   LEFT JOIN users ON it_tickets.emp_id = users.emp_id
//   ORDER BY it_tickets.raised_time DESC;`;

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get("/it_tickets/:empId", (req, res) => {
//   const empId = req.params.empId;
//   const sql = "SELECT * FROM it_tickets WHERE emp_id = ?";

//   db.query(sql, [empId], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // app.get("/it_tickets/:empId", (req, res) => {
// //   const empId = req.params.empId;
// //   const sql = `SELECT *
// //   FROM it_tickets AS t1
// //   LEFT OUTER JOIN it_reply AS t2 ON t1.ticket_id = t2.ticket_id
// //   WHERE (t1.emp_id = ? OR t2.approver_id = ?)
// //   `;

// //   db.query(sql, [empId,empId], (err, result) => {
// //     if (err) throw err;
// //     res.send(result);
// //   });
// // });

// app.get("/it_tickets_status/:empId", (req, res) => {
//   const empId = req.params.empId;
//   const sql = `
//     SELECT 
//       it_tickets.ticket_id,
//       it_tickets.project_name,
//       it_tickets.module_name,
//       it_tickets.category,
//       it_tickets.issue_title,
//       it_tickets.raised_time,
//       it_reply.ticket_status,
//       it_reply.support_person,
//       it_reply.approval_reqd,
//       it_reply.approver_id,
//       it_tickets.contact  
//     FROM it_tickets
//     LEFT JOIN it_reply ON it_tickets.ticket_id = it_reply.ticket_id
//     WHERE it_tickets.emp_id = ? OR it_reply.approver_id = ?
//   `;

//   db.query(sql, [empId, empId], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.post("/it_reply", (req, res) => {
//   const {
//     ticketId,
//     ticketStatus,
//     ccList,
//     solutionTime,
//     department,
//     description,
//     imageData,
//     approval_reqd,
//     approver_id,
//     empID,
//     empName,
//   } = req.body;

//   // First, check if a row with the given ticketId exists in the it_reply table
//   const checkQuery = "SELECT * FROM it_reply WHERE ticket_id = ?";
//   db.query(checkQuery, [ticketId], (err, result) => {
//     if (err) throw err;

//     if (result.length > 0) {
//       const updateQuery =
//         "UPDATE it_reply SET ticket_status = ?, cc_list = ?, solution_time = ?, department = ?, description = ?, image_data = ?, approval_reqd = ?, approver_id = ?, created_by = ?, support_person = ? WHERE ticket_id = ?";
//       db.query(
//         updateQuery,
//         [
//           ticketStatus,
//           ccList,
//           solutionTime,
//           department,
//           description,
//           imageData,
//           approval_reqd,
//           approver_id,
//           empID,
//           empName,
//           ticketId,
//         ],
//         (err, result) => {
//           if (err) throw err;
//           res.status(200).send("Data updated successfully!");
//         }
//       );
//     } else {
//       const insertQuery =
//         "INSERT INTO it_reply (ticket_id, ticket_status, cc_list, solution_time, department, description, image_data, approval_reqd, approver_id, created_by, support_person) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//       db.query(
//         insertQuery,
//         [
//           ticketId,
//           ticketStatus,
//           ccList,
//           solutionTime,
//           department,
//           description,
//           imageData,
//           approval_reqd,
//           approver_id,
//           empID,
//           empName,
//         ],
//         (err, result) => {
//           if (err) throw err;
//           res.status(200).send("Data sent successfully!");
//         }
//       );
//     }
//   });
// });

app.get("/api/employees", (req, res) => {
  const sql = "SELECT user_name FROM its_users";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
      return;
    }
    const userName = result.map((row) => row.user_name);
    res.status(200).json(userName);
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

// app.post("/approve_reject", (req, res) => {
//   const {
//     ticketId,
//     approverId,
//     projectName,
//     moduleName,
//     category,
//     issueTitle,
//     remarks,
//     approvalStatus,
//   } = req.body;

//   const sql =
//     "INSERT INTO it_approval (ticket_id, approver_id, project_name, module_name, category, issue_title, remarks, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

//   db.query(
//     sql,
//     [
//       ticketId,
//       approverId,
//       projectName,
//       moduleName,
//       category,
//       issueTitle,
//       remarks,
//       approvalStatus,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error executing query:", err);
//         return res.status(500).send("Internal server error");
//       }

      
//       const updateTicketSql =
//         "UPDATE it_reply SET approval_reqd = 0, approver_id = ? WHERE ticket_id = ?";
//       db.query(updateTicketSql, [approverId, ticketId], (err, result) => {
//         if (err) {
//           console.error("Error executing query:", err);
//           return res.status(500).send("Internal server error");
//         }
//         res.status(200).send("Data sent successfully!");
//       });
//     }
//   );
// });

// app.get("/api/approval/:ticketId", (req, res) => {
//   const ticketId = req.params.ticketId;
//   const sql = "SELECT * FROM it_approval WHERE ticket_id = ?";

//   db.query(sql, [ticketId], (err, result) => {
//     if (err) {
//       console.error("Error fetching approval data:", err);
//       res.status(500).send("Internal server error");
//       return;
//     }

//     res.send(result[0] || {});
//   });
// });

// const pathToDataDirectory = "../public/Data";
// const dataFilePath = path.join(pathToDataDirectory, "data.json");
// const replyDataFilePath = path.join(pathToDataDirectory, "replyData.json");

// app.post("/submit", (req, res) => {
//   const data = req.body;
//   data.id = Math.floor(Math.random() * 9000 + 1000);
//   data.raisedTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");

//   if (!fs.existsSync(dataFilePath)) {
//     fs.writeFileSync(dataFilePath, JSON.stringify([data], null, 2));
//   } else {
//     const jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
//     jsonData.push(data);
//     fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
//     res.send("Data saved successfully.");
//   }
// });

// app.post("/reply", (req, res) => {
//   const replyData = req.body;

//   if (!fs.existsSync(replyDataFilePath)) {
//     fs.writeFileSync(replyDataFilePath, JSON.stringify([replyData], null, 2));
//   } else {
//     const jsonData = JSON.parse(fs.readFileSync(replyDataFilePath, "utf8"));
//     jsonData.push(replyData);
//     fs.writeFileSync(replyDataFilePath, JSON.stringify(jsonData, null, 2));
//     res.send("Reply data saved successfully.");
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
