import { useState, useRef } from "react";
import classes from "./Slots.module.css";

const Slots = () => {
  const [showForm, setShowForm] = useState(false);
  const [slotTime, setSlotTime] = useState(null);
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

    setClients((prevState) => {
      return [...prevState, user];
    });

    nameInputRef.current.value = "";
    mailInputRef.current.value = "";

    setShowForm(false);
  };

  const meetingDeleteHandler = () => {
    console.log("This meeting was deleted!");
  };

  console.log(clients);

  return (
    <div>
      <h1 className={classes.heading1}>Available Slots</h1>
      <div className={classes.slotsDiv}>
        <div className={classes.slot} onClick={() => slotHandler("9:00")}>
          <h3>Slot Timing: 9:00 A.M</h3>
          <p>Available Slots : 4</p>
        </div>
        <div className={classes.slot} onClick={() => slotHandler("10:00")}>
          <h3>Slot Timing: 10:00 A.M</h3>
          <p>Available Slots : 4</p>
        </div>
        <div className={classes.slot} onClick={() => slotHandler("11:00")}>
          <h3>Slot Timing: 11:00 A.M</h3>
          <p>Available Slots : 4</p>
        </div>
        <div className={classes.slot} onClick={() => slotHandler("12:00")}>
          <h3>Slot Timing: 12:00 P.M</h3>
          <p>Available Slots : 4</p>
        </div>
      </div>
      <form
        onSubmit={formSubmitHandler}
        className={showForm ? classes.showForm : classes.hideForm}
      >
        <div className={classes.inputDiv}>
          <label>Name:</label>
          <input type="text" ref={nameInputRef} />
        </div>
        <div className={classes.inputDiv}>
          <label>Email:</label>
          <input type="email" ref={mailInputRef} />
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
          <div className={classes.scheduleMeetingDiv}>
            <h1>Name: {client.name}</h1>
            <p>Email: {client.email}</p>
            <p>Slot Time: {client.slotTime}</p>
            <button
              onClick={meetingDeleteHandler}
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
