import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [dataCuaca, setDataCuaca] = useState<any | null>(null);
  const [pesanKesalahan, setPesanKesalahan] = useState<string>('');

  const kotaDefault = 'Manado';
  const apiKeys = '05f0dcd8d3b90d732a3d8d2b3bcaa179';

  useEffect(() => {
    ambilDataCuaca(kotaDefault);
  }, []);

  const ambilDataCuaca = async (kota: string) => {
    setPesanKesalahan('');
    try {
      const respon = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKeys}&units=metric`);
      if (respon.status === 200) {
        setDataCuaca(respon.data);
      } else {
        setPesanKesalahan(`Kesalahan: ${respon.status} - ${respon.statusText}`);
      }
    } catch (error: any) {
      if (error.response) {
        setPesanKesalahan(`Kesalahan: ${error.response.status} - ${error.response.statusText}`);
      } else {
        setPesanKesalahan('Terjadi kesalahan saat mengambil data cuaca. Periksa koneksi jaringan atau kunci API.');
      }
    }
  };

  return (
    <div className="tab1-container">
      <h1>Cuaca di {kotaDefault}</h1>
      {pesanKesalahan ? (
        <p>{pesanKesalahan}</p>
      ) : (
        dataCuaca && (
          <div className="weather-card">
            <div className="weather-details">
              <h2>{dataCuaca.name}</h2>
              <p>{dataCuaca.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataCuaca.weather[0].icon}@2x.png`} alt="Ikon Cuaca" />
              <div className="weather-temperature">{Math.round(dataCuaca.main.temp)}°C</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Tab1;
