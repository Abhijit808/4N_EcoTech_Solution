import express from "express";
import cors from "cors";
import "dotenv/config";
import { google } from "googleapis";
const app = express();
const PORT = 8000;
app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("working");
});
app.post("/check", async (req, res) => {
  console.log(req.body);

  const data = req.body;
  console.log(data.data);
  const event = {
    summary: data.data.summary,
    location: data.data.location,
    description: data.data.description,
    start: {
      dateTime: new Date(data.data.startdatetime),
      timeZone: data.data.timezone,
    },
    end: {
      dateTime: new Date(data.data.enddatetime),
      timeZone: data.data.timezone,
    },
  };
  const access_token = data.accode;
  const refresh_token = data.recode;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);
  oAuth2Client.setCredentials({ access_token, refresh_token });
  const calendar = google.calendar({ version: "v3" });
  calendar.events.insert(
    {
      auth: oAuth2Client,
      calendarId: "primary",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.data.htmlLink);
      res.send({ link: event.data.htmlLink });
    }
  );
  // res.send("sent");
});
app.listen(PORT, () => {
  console.log(`listening on port 8000`);
});
