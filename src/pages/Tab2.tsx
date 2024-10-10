import React, { useState } from 'react';
import axios from 'axios';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [dataCuaca, setDataCuaca] = useState<any | null>(null);
  const [kotaInput, setKotaInput] = useState<string>('');
  const [pesanKesalahan, setPesanKesalahan] = useState<string>('');

  const apiKunci = '9a8ea294bed6bb6a10e7a91941c3a347';

  const ambilDataCuaca = async (namaKota: string) => {
    setPesanKesalahan('');
    try {
      const respon = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${namaKota}&appid=${apiKunci}&units=metric`);
      setDataCuaca(respon.data);
    } catch (error) {
      setPesanKesalahan('Kota tidak ditemukan atau terjadi kesalahan jaringan.');
    }
  };

  const tanganiPencarian = (e: React.FormEvent) => {
    e.preventDefault();
    if (kotaInput) {
      ambilDataCuaca(kotaInput);
      setKotaInput('');
    }
  };

  return (
    <div className="tab2-container">
      <h1>Pencarian Cuaca</h1>
      <form onSubmit={tanganiPencarian}>
        <input type="text" value={kotaInput} onChange={(e) => setKotaInput(e.target.value)} placeholder="Masukkan Nama Kota..." />
        <button type="submit">Cari</button>
      </form>
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

export default Tab2;
