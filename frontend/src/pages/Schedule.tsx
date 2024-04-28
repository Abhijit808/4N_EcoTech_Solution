import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectedtoken } from "../store/tokenSlice";
import { timeZones } from "../utils/timezones";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";

const Calendar = () => {
  const user: any = useAppSelector(selectedtoken);
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [startdatetime, setstartdatetime] = useState("");
  const [enddatetime, setenddatetime] = useState("");
  const [timezone, settimezone] = useState("");
  const [link, setlink] = useState("");

  const handleclick = async () => {
    console.log(
      summary,
      location,
      description,
      startdatetime,
      enddatetime,
      timezone
    );
    const data = fetch("http://localhost:8000/check", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        data: {
          summary,
          location,
          description,
          startdatetime,
          enddatetime,
          timezone,
        },
        recode: user?.refresh_token,
        accode: user?.access_token,
      }),
    });
    const res = (await data).json();
    const reslut = await res;
    console.log(reslut.link);

    setlink(reslut.link);
  };
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" flex items-center flex-col justify-center h-screen gap-2  w-full py-4 bg-slate-600">
      <nav className="flex items-center justify-between px-5 py-2 relative ">
        <button
          className="flex flex-col btn btn-secondary"
          onClick={handleSignout}
        >
          <span className="material-symbols-outlined ">logout</span>
        </button>
      </nav>
      <div className="summary flex flex-col items-center w-full ">
        <label htmlFor="summary">Name of the event</label>
        <input
          type="text"
          name="summary"
          id=""
          className="input input-bordered w-full max-w-xs  "
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className="location flex flex-col items-center  w-full">
        <label htmlFor="location">Location of the event</label>
        <input
          type="text"
          name="location"
          id=""
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setlocation(e.target.value)}
        />
      </div>
      <div className="description flex flex-col items-center w-full">
        <label htmlFor="summary">description of the event</label>
        <textarea
          className="input input-bordered w-full max-w-xs"
          placeholder="Bio"
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
      </div>
      <div className="statt-datetime flex flex-col items-center  w-full">
        <label htmlFor="location">start of the event</label>
        <input
          type="datetime-local"
          name="start_date_time"
          id=""
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setstartdatetime(e.target.value)}
        />
      </div>
      <div className="end-date-time flex flex-col items-center  w-full">
        <label htmlFor="location">end of the event</label>
        <input
          type="datetime-local"
          name="end_date_time"
          id=""
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setenddatetime(e.target.value)}
        />
      </div>
      <div className="timezone  flex flex-col items-center w-full">
        <label htmlFor="time">Choose a timezone</label>
        <select
          name=""
          id=""
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => settimezone(e.target.value)}
        >
          <option defaultValue="select a time zone">Select a time zone</option>
          {timeZones.map((val) => {
            return <option value={val}>{val}</option>;
          })}
        </select>
      </div>
      <button onClick={handleclick} className="btn btn-secondary">
        clickme
      </button>
      {link !== "" && (
        <button className="btn btn-secondary">
          <a href={link} target="_blank" rel="noopener noreferrer">
            share
          </a>
        </button>
      )}
    </div>
  );
};

export default Calendar;
