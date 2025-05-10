import { useState, useRef, useEffect } from "react";
import classes from "./Slots.module.css";
import axios from "axios";

const Slots = () => {
  const [showForm, setShowForm] = useState(false);
  const [slotTime, setSlotTime] = useState(null);
  const [render, setRender] = useState(true);
  const [clients, setClients] = useState([]);
  const nameInputRef = useRef();
  const mailInputRef = useRef();

  const slotHandler = (time) => {
    setShowForm(true);
    setSlotTime(time);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const email = mailInputRef.current.value;

    const user = {
      name,
      email,
      slotTime,
    };

    axios
      .post("http://localhost:5000/add-schedule", user)
      .then((res) => {
        setRender(true);
        console.log(res.data.newUser);
      })
      .catch((err) => {
        console.log(err);
      });

    nameInputRef.current.value = "";
    mailInputRef.current.value = "";

    setShowForm(false);
  };

  const meetingDeleteHandler = (id) => {
    axios
      .delete(`http://localhost:5000/delete-schedule/${id}`)
      .then((res) => {
        console.log(`This meeting of id ${id}  was deleted!`);
        setRender(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAllAppointments = () => {
    axios
      .get("http://localhost:5000/get-all-schedules")
      .then((res) => {
        setClients(res.data.allSchedules);
        setRender(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (render) {
      showAllAppointments();
    }
  }, [render]);

  return (
    <div>
      <h1 className={classes.heading1}>Available Slots</h1>
      <div className={classes.slotsDiv}>
        <div className={classes.slot} onClick={() => slotHandler("9:00 A.M")}>
          <h3>Slot Timing: 9:00 A.M</h3>
          <p>Available Slots : 4</p>
        </div>
        <div className={classes.slot} onClick={() => slotHandler("10:00 A.M")}>
          <h3>Slot Timing: 10:00 A.M</h3>
          <p>Available Slots : 4</p>
        </div>
        <div className={classes.slot} onClick={() => slotHandler("11:00 A.M")}>
          <h3>Slot Timing: 11:00 A.M</h3>
          <p>Available Slots : 4</p>
        </div>
        <div className={classes.slot} onClick={() => slotHandler("12:00 P.M")}>
          <h3>Slot Timing: 12:00 P.M</h3>
          <p>Available Slots : 4</p>
        </div>
      </div>
      <form
        onSubmit={formSubmitHandler}
        className={showForm ? classes.showForm : classes.hideForm}
      >
          <h5 className={classes.clear} onClick={() => {setShowForm(false)}}>X</h5>
        <div className={classes.inputDiv}>
          <label>Name:</label>
          <input type="text" ref={nameInputRef} required />
        </div>
        <div className={classes.inputDiv}>
          <label>Email:</label>
          <input type="email" ref={mailInputRef} required />
        </div>
        <button className={classes.submitBtn} type="submit">
          Submit
        </button>
      </form>
      <div>
        <h1 className={classes.heading1}>Scheduled Meetings</h1>
      </div>
      <div className={classes.meetingDiv}>
        {clients.map((client) => (
          <div key={client.id} className={classes.scheduleMeetingDiv}>
            <p>
              <span className={classes.span}>Name: </span>
              {client.name}
            </p>
            <p>
              <span className={classes.span}>Email: </span>
              {client.email}
            </p>
            <p>
              <span className={classes.span}>Slot Time: </span>
              {client.slot}
            </p>
            <p>
              <span className={classes.span}>Meeting Link: </span>
              <a
                href="https://meet.google.com/abc-defg-hij"
                target="_blank"
                rel="noreferrer"
              >
                https://meet.google.com/abc-defg-hij
              </a>
            </p>
            <button
              onClick={() => {
                meetingDeleteHandler(client.id);
              }}
              className={classes.cancleBtn}
            >
              Cancle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slots;
