import axios from "axios";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const Calender = () => {
    const [item, setItem] = useState([]);

    console.log(item)
    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('https://thawing-journey-46311.herokuapp.com/')
                setItem(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);

    return (
        <div>
            <Calendar localizer={localizer} events={item} startAccessor="date" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default Calender;