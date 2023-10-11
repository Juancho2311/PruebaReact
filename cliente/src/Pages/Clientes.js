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

export const Clientes = () => {
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

    const data = await axios.post("http://localhost:8080/cliente", body);

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

  useEffect(() => {
    console.log("Entra");
    handleValidate();
  }, [selectedDateInicio, selectedDateFinal]);

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
          <Bar dataKey="consumo_comercial" fill="#9500F9" />
          <Bar dataKey="consumo_industrial" fill="##32AB32" />
          <Bar dataKey="consumo_residencial" fill="#ee7820" />
          <Bar dataKey="consumo_industrial" fill="#5f7f7a" />
          <Bar dataKey="perdidas_residencial" fill="#ffff00" />
          <Bar dataKey="perdidas_comercial" fill="#18171c" />
          <Bar dataKey="perdidas_industrial" fill="#0a0a0a" />
          <Bar dataKey="costo_residencial" fill="#7e7b52" />
          <Bar dataKey="costo_comercial" fill="#dc2d22" />
          <Bar dataKey="costo_industrial" fill="#308446" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
