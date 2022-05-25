const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const path = require("path");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(err, "public/images/emp");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(err, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });
const mysql = require("mysql");

const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors());
app.use(express.json());
const users = [];
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "JobPortalDB",
});
app.post("/register", async (req, res) => {
  console.log("input", req.body);
  const email = req.body.email;

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const name = req.body.name;
  const age = req.body.age;

  const last_school = req.body.lastSchool;
  const last_qualification = req.body.lastQualification;
  const image = req.body.Url;
  // upload.single(image);

  db.query(
    "INSERT INTO EMPLOYEE (Name,Password,Age,Email,Last_School,Last_Qualification,Image)Values(?,?,?,?,?,?,?) ",
    [name, hash, age, email, last_school, last_qualification, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ insertId: result.insertId });
        // res.send("Values Inserted");
        console.log("CValues Inserted");
      }
    }
  );
});
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 10);
  console.log(email, password, hash);
  db.query(
    "SELECT * FROM EMPLOYEE WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        // console.log(result[0].Password);

        const validPass = await bcrypt.compare(password, result[0].Password);
        console.log(validPass);
        if (validPass) {
          console.log(result);
          // res.send(result).status(200);
          res.status(200).send(result);
        } else {
          console.log("wrong username pass");
          // res.send({ message: "Wrong Username/Password" }).status(404);
          res.status(404).send({ message: "Wrong Username/Password" });
        }
      } else {
        console.log("wrong username");
        // res.send({ message: "Wrong Username/Password" }).status(404);
        res.status(404).send({ message: "Wrong Username/Password" });
      }
    }
  );

  // const user = await db("users").first("*").where({ email: email });
  // // const user = users.find((user) => user.email, email);
  // if (user) {
  //   const validPass = await bcrypt.compare(password, user.hash);
  //   if (validPass) {
  //     // console.log(user.json);
  //     console.log(user);
  //   } else {
  //     console.log("wrong username pass");
  //   }
  // } else {
  //   console.log("user not found");
  // }
});
app.post("/updateEmployeeRecord", async (req, res) => {
  console.log("input", req.body);
  const email = req.body.email;

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const name = req.body.name;
  const age = req.body.age;

  const last_school = req.body.lastSchool;
  const last_qualification = req.body.lastQualification;
  const id = req.body.id;

  db.query(
    "UPDATE EMPLOYEE SET Name=?,Password=?,Age=?,Email=?,Last_School=?,Last_Qualification=? WHERE ID=?",
    [name, hash, age, email, last_school, last_qualification, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Updated");
        console.log("Values Updated");
      }
    }
  );
});
app.post("/company_registration", async (req, res) => {
  console.log("input", req.body);
  const email = req.body.comp_email;

  const password = req.body.comp_password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const name = req.body.comp_name;
  const sector = req.body.comp_sector;
  const location = req.body.comp_location;
  const Image = req.body.Url;

  db.query(
    "INSERT INTO COMPANY (comp_name,comp_password,comp_email,comp_sector,comp_loc,Image)Values(?,?,?,?,?,?) ",
    [name, hash, email, sector, location, Image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log({ result });
        res.send({ insertId: result.insertId });
        console.log("Values Inserted");
      }
    }
  );
});
app.post("/company_login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 10);

  console.log(email, password, hash);
  db.query(
    "SELECT * FROM company WHERE comp_email=?",
    [email],
    async (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("this is result", result[0]);

        const validPass = await bcrypt.compare(
          password,
          result[0].comp_password
        );
        console.log(validPass);
        if (validPass) {
          console.log(result);
          // res.send(result).status(200);
          res.status(200).send(result);
        } else {
          console.log("wrong username pass");
          // res.send({ message: "Wrong Username/Password" }).status(404);
          res.status(404).send({ message: "Wrong Username/Password" });
        }
      } else {
        console.log("wrong username");
        // res.send({ message: "Wrong Username/Password" }).status(404);
        res.status(404).send({ message: "Wrong Username/Password" });
      }
    }
  );
  app.post("/updateCompanyRecord", async (req, res) => {
    console.log("input", req.body);
    const email = req.body.comp_email;
    const password = req.body.comp_password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const name = req.body.comp_name;
    const sector = req.body.comp_sector;
    const location = req.body.comp_location;
    const id = req.body.comp_id;
    // console.log("heloooooooo");

    db.query(
      "UPDATE COMPANY SET comp_name=?,comp_password=?,comp_email=?,comp_sector=?,comp_loc=? where comp_id=? ",
      [name, hash, email, sector, location, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Updated");
          console.log("Values Updated");
        }
      }
    );
  });

  // const user = await db("users").first("*").where({ email: email });
  // // const user = users.find((user) => user.email, email);
  // if (user) {
  //   const validPass = await bcrypt.compare(password, user.hash);
  //   if (validPass) {
  //     // console.log(user.json);
  //     console.log(user);
  //   } else {
  //     console.log("wrong username pass");
  //   }
  // } else {
  //   console.log("user not found");
  // }
});
app.get("/viewJobs", async (req, res) => {
  console.log("jobs viewing");
  db.query(
    "SELECT J.*, C.comp_name,C.comp_loc FROM JOBS J, COMPANY C where J.comp_id=C.comp_id ",

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    }
  );
});
app.get("/viewEmployeeDetails", async (req, res) => {
  console.log("Employee details viewing");
  db.query(
    "SELECT * FROM EMPLOYEE ",

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // console.log(result);
        res.status(200).send(result);
      }
    }
  );
});
app.post("/deleteCompany", async (req, res) => {
  console.log("deletecompany", req.body);
  const ID = req.body.ID;
  db.query(
    "DELETE FROM COMPANY WHERE comp_id=?",
    [ID],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    }
  );
});
app.post("/deleteEmployee", async (req, res) => {
  console.log("deleteEMPLOYEE", req.body);
  const ID = req.body.ID;
  db.query(
    "DELETE FROM EMPLOYEE WHERE ID=?",
    [ID],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    }
  );
});
app.get("/viewCompanyDetails", async (req, res) => {
  console.log("Company Details viewing");
  db.query(
    "SELECT * FROM COMPANY ",

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // console.log(result);
        res.status(200).send(result);
      }
    }
  );
});

app.post("/viewMyJobs", async (req, res) => {
  console.log("Display My Jobs");
  console.log("This is data", req.body);
  const comp_id = req.body.comp_id;
  // console.log({ id });
  db.query(
    "SELECT J.*, C.comp_name,C.comp_loc FROM JOBS J, COMPANY C where J.comp_id=? AND J.comp_id=C.comp_id",
    [comp_id],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log({ result });
        res.status(200).send(result);
      }
    }
  );
});
app.post("/deletejob", async (req, res) => {
  console.log("deleting My Jobs");
  console.log("This is data", req.body);
  const job_id = req.body.job_id;
  // console.log({ id });
  db.query(
    "DELETE FROM JOBS WHERE JOB_ID=?",
    [job_id],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log({ result });
        res.status(200).send(result);
      }
    }
  );
});
app.post("/addJobs", async (req, res) => {
  console.log("data");
  console.log(req.body);
  const job_title = req.body.title;
  const job_desc = req.body.desc;
  const job_skills = req.body.skills;
  const job_years_of_experience = req.body.years_of_experience;
  const job_no_of_positions = req.body.no_of_positions;
  const job_salary = req.body.salary;
  const job_career_level = req.body.career_level;
  // const job_date = req.body.date;
  const job_company = req.body.job_company;
  const job_comp_id = req.body.job_comp_id;
  const job_type = req.body.job_type;
  const job_category = req.body.job_category;
  db.query(
    "INSERT INTO JOBS (job_title,job_sal,job_desc,job_skills,job_type,job_category,comp_id,job_career_level,job_no_position,job_years_of_experience)Values(?,?,?,?,?,?,?,?,?,?) ",
    [
      job_title,
      job_salary,
      job_desc,
      job_skills,
      job_type,
      job_category,
      job_comp_id,
      job_career_level,
      job_no_of_positions,
      job_years_of_experience,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log("Values Inserted");
      }
    }
  );
});
app.post("/updateJobs", async (req, res) => {
  console.log("data");
  console.log(req.body);
  const job_title = req.body.title;
  const job_desc = req.body.desc;
  const job_skills = req.body.skills;
  const job_years_of_experience = req.body.years_of_experience;
  const job_no_of_positions = req.body.no_of_positions;
  const job_salary = req.body.salary;
  const job_career_level = req.body.career_level;
  // const job_date = req.body.date;
  const job_company = req.body.job_company;
  const job_comp_id = req.body.job_comp_id;
  const job_type = req.body.job_type;
  const job_category = req.body.job_category;
  const job_id = req.body.id;
  db.query(
    "UPDATE JOBS SET job_title=?,job_sal=?,job_desc=?,job_skills=?,job_type=?,job_category=?,comp_id=?,job_career_level=?,job_no_position=?,job_years_of_experience=? WHERE JOB_ID=?",
    [
      job_title,
      job_salary,
      job_desc,
      job_skills,
      job_type,
      job_category,
      job_comp_id,
      job_career_level,
      job_no_of_positions,
      job_years_of_experience,
      job_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log("Values Inserted");
      }
    }
  );
});
app.post("/Resume", async (req, res) => {
  // console.log("jobs viewing");
  const id = req.body.id;
  console.log(id);
  db.query(
    "SELECT * from JOBS where job_id=?",
    [id],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(result[0]);
        res.status(200).send(result);
      }
    }
  );
});
app.post("/submitResume", async (req, res) => {
  console.log("data");
  console.log(req.body);
  const EMP_ID = req.body.Emp_ID;
  const JOB_ID = req.body.Job_ID;
  const Summary = req.body.Summary;
  const CV = req.body.CV;
  const status = "Pending";
  db.query(
    "INSERT INTO APPLICATION (EMP_ID,JOB_ID,SUMMARY,status,CV)Values(?,?,?,?,?) ",
    [EMP_ID, JOB_ID, Summary, status, CV],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log("Values Inserted");
      }
    }
  );
});
app.post("/DownloadResume", async (req, res) => {
  console.log("This is CV", req.body.CV);
  const CV1 = req.body.CV;
  console.log("This is CV1", CV1);
  // res.send(`uploads\\\\${CV1}`);
  // res.download("Mubeen_Siddiqui_Resume.pdf");
  // app.use(express.static(__dirname + "uploads/Mubeen_Siddiqui_Resume.pdf"));
  // res.attachment(path.resolve("./Mubeen_Siddiqui_Resume.pdf"));
  // res.send();
  res.sendFile(__dirname + "/Mubeen_Siddiqui_Resume.pdf");
});

app.post("/displayUserJobs", async (req, res) => {
  console.log("Display User Jobs");
  console.log(req.body);
  const id = req.body.id;
  console.log({ id });
  db.query(
    "SELECT A.*,J.job_title from APPLICATION A,JOBS J where emp_id=? AND A.JOB_ID=J.job_id",
    [id],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log({ result });
        res.status(200).send(result);
      }
    }
  );
});

app.post("/displayCompanyJobs", async (req, res) => {
  console.log("Display Company Jobs");
  console.log(req.body);
  const id = req.body.job_id;
  console.log({ id });
  db.query(
    "SELECT A.*, E.Name from APPLICATION  A ,EMPLOYEE E where JOB_ID=? AND A.EMP_ID=E.ID",
    [id],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log({ result });
        res.status(200).send(result);
      }
    }
  );
});
app.post("/Accept", async (req, res) => {
  console.log("input", req.body);
  const Status = "Accepted";
  const ID = req.body.ID;
  console.log(ID);

  db.query(
    "UPDATE APPLICATION SET STATUS=? WHERE ID=?",
    [Status, ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Updated");
        console.log("Values Updated");
      }
    }
  );
});
app.post("/Reject", async (req, res) => {
  console.log("input", req.body);
  const Status = "Rejected";
  const ID = req.body.ID;
  console.log(ID);

  db.query(
    "UPDATE APPLICATION SET STATUS=? WHERE ID=?",
    [Status, ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Updated");
        console.log("Values Updated");
      }
    }
  );
});
app.post("/job_history", async (req, res) => {
  console.log("Display Accepted Jobs");
  console.log(req.body);
  const EMP_ID = req.body.EMP_ID;
  const JOB_ID = req.body.JOB_ID;
  const COMP_ID = req.body.comp_id;
  const STATUS = "Accepted";
  const END_DATE = "Present";
  db.query(
    "INSERT INTO JOB_HISTORY (EMP_ID,JOB_ID,END_DATE,COMP_ID) VALUES (?,?,?,?) ",
    [EMP_ID, JOB_ID, END_DATE, COMP_ID],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send("Values Inserted in Job History");
        console.log("Values Inserted in JOb History");
      }
    }
  );
});
app.post("/applyfilter", async (req, res) => {
  console.log("Display Filtered Jobs");
  console.log(req.body);

  const city = req.body.search.city;
  const title = req.body.search.title;
  const minSal = req.body.minSal;
  if (city && title && minSal) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J, COMPANY C WHERE C.comp_loc=? AND J.JOB_TITLE=? AND J.JOB_SAL>=? AND J.COMP_ID=C.COMP_ID",
      [city, title, minSal * 1000],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  } else if (city && title) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J, COMPANY C WHERE C.comp_loc=? AND J.JOB_TITLE=? AND J.COMP_ID=C.COMP_ID",
      [city, title],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  } else if (city && minSal) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J, COMPANY C WHERE C.comp_loc=? AND J.JOB_SAL>=? AND J.COMP_ID=C.COMP_ID",
      [city, minSal * 1000],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  } else if (title && minSal) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J,COMPANY C WHERE JOB_SAL>=? AND JOB_TITLE=? AND J.COMP_ID=C.COMP_ID",
      [minSal * 1000, title],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  } else if (title) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J , COMPANY C WHERE JOB_TITLE=? AND J.COMP_ID=C.COMP_ID",
      [title],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  } else if (minSal) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J, COMPANY C WHERE JOB_SAL>=? AND J.COMP_ID=C.COMP_ID",
      [minSal * 1000],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  } else if (city) {
    db.query(
      "SELECT J.*,C.comp_loc,C.comp_name FROM JOBS J, COMPANY C WHERE C.comp_loc=? AND J.COMP_ID=C.COMP_ID",
      [city],

      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log("filtered", { result });
          res.status(200).send(result);
        }
      }
    );
  }
});

// To upload image to server

// To extract data from incoming request

// To get file paths, remove files
const fs = require("fs");

// body parser configuration

var unless = function (path, middleware) {
  return function (req, res, next) {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
cloudinary.config({
  cloud_name: "dpinwb6mz",

  api_key: "319166531961829",
  api_secret: "C-1Bn6fP5mlpK7Vb6j4_xYqz6ZU",
});

async function uploadToCloudinary(locaFilePath) {
  // locaFilePath :
  // path of image which was just uploaded to "uploads" folder
  var mainFolderName = "main";
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;
  filePathOnCloudinary = filePathOnCloudinary.replace("\\", "/");

  // filePathOnCloudinary :
  // path of image we want when it is uploded to cloudinary
  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder
      // fs.unlinkSync(locaFilePath);

      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return { message: error };
    });
}

function buildSuccessMsg(urlList) {
  // Building success msg
  var response = '<h1><a href="/">Click to go to Home page</a><br></h1><hr>';

  for (var i = 0; i < urlList.length; i++) {
    response += "File uploaded successfully.<br><br>";
    response += `FILE URL: <a href="${urlList[i]}">${urlList[i]}</a>.<br><br>`;
    response += `<img src="${urlList[i]}" /><br><hr>`;
  }
  response += `<br><p>Now you can store this url in database or do anything with it  based on use case.</p>`;
  return response;
}
/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.post(
  "/profile-upload-single",
  upload.single("image"),
  async function (req, res, next) {
    console.log("start");
    console.log(JSON.stringify(req.body.input));
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    var locaFilePath = req.file.path;
    console.log({ locaFilePath });
    uploadToCloudinary(locaFilePath).then((url) => {
      console.log("SIngle Photo", url);
      res.json(url);
    });
  }
);
app.post(
  "/profile-upload-single1",
  upload.single("CV"),
  async function (req, res, next) {
    console.log("start");
    console.log("a1", req.body);
    console.log("Adnan", JSON.stringify(req.body.input));
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    var locaFilePath = req.file.path;
    console.log({ locaFilePath });
    uploadToCloudinary(locaFilePath).then((url) => {
      console.log("CV", url);
      res.json(url);
    });
  }
);

app.post(
  "/profile-upload-multiple",
  upload.array("profile-files", 12),
  async function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var imageUrlList = [];

    for (var i = 0; i < req.files.length; i++) {
      var locaFilePath = req.files[i].path;
      var result = await uploadToCloudinary(locaFilePath);
      imageUrlList.push(result.url);
    }
    var response = buildSuccessMsg(imageUrlList);

    return res.send(response);
  }
);

app.listen(3001, () => {
  console.log("App is running");
});
