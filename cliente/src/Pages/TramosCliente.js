import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const TramosCliente = () => {
  // Base de datos
  const [datas, setdatas] = useState([]);
  const [selectedDateInicio, setSelectedDateInicio] = useState("");
  const [selectedDateFinal, setSelectedDateFinal] = useState("");

  useEffect(() => {
    getdata("2010-01-01", "2010-01-02");
  }, []);

  const getdata = async (FechaIncial, FechaFinal) => {
    const body = {
      fechainicial: FechaIncial,
      fechafinal: FechaFinal,
    };
    console.log(body);

    const data = await axios.post("http://localhost:8080/tramos-cliente", body);

    setdatas(data.data);
  };

  const handleDateChange = (date) => {
    setSelectedDateInicio(new Date(date));
  };

  const handleDateChangeFinal = (date) => {
    setSelectedDateFinal(new Date(date));
  };

  const handleValidate = () => {
    if (selectedDateInicio !== "" && selectedDateFinal !== "") {
      getdata(
        format(selectedDateInicio, "yyyy/MM/dd"),
        format(selectedDateFinal, "yyyy/MM/dd")
      );
    }
    if (selectedDateInicio !== "") {
      console.log(selectedDateInicio);
      const fechaOriginal = new Date(selectedDateInicio);

      const fechaFormateada = format(fechaOriginal, "yyyy/MM/dd");

      console.log(fechaFormateada); // Resultado: 2023/10/03
    }
  };

  return (
    <>
      <h1>Calendario</h1>
      {/* Calendario inicial */}
      <div className="calendario">
        <p>Inicio de fecha</p>
        <DatePicker
          selected={selectedDateInicio}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Calendario final */}
      <div className="calendario">
        <p>Final de fecha</p>
        <DatePicker
          selected={selectedDateFinal}
          onChange={handleDateChangeFinal}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <h1>Grafica</h1>
      <ResponsiveContainer width="50%" aspect={2}>
        <BarChart
          data={datas}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="Linea" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TipoConsumo" fill="#9500F9" />
          <Bar dataKey="Perdidas" fill="#32AB32" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
