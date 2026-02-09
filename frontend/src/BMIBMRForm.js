import React, { useState } from "react";
import axios from "axios";

function BMIBMRForm() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateBMI = (h, w) => {
    return w / ((h / 100) ** 2);
  };

  const calculateBMR = (h, w, a, g) => {
    if (g === "male") {
      return 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      return 10 * w + 6.25 * h - 5 * a - 161;
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "過輕";
    if (bmi < 24) return "正常";
    if (bmi < 27) return "過重";
    return "肥胖";
  };

  const getBMRStatus = (bmr) => {
    if (bmr < 1400) return "代謝偏低";
    if (bmr < 1800) return "代謝正常";
    return "代謝偏高";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (!h || !w || !a) {
      setError("請輸入完整資料");
      return;
    }

    const bmi = calculateBMI(h, w);
    const bmr = calculateBMR(h, w, a, gender);
    const bmiCategory = getBMICategory(bmi);
    const bmrStatus = getBMRStatus(bmr);

    try {
      const response = await axios.post("/api/bmi-records/", {
        height: h,
        weight: w,
        age: a,
        gender: gender,
        bmi: bmi,
        bmr: bmr,
      });
      setResult({ ...response.data, bmiCategory, bmrStatus });
    } catch (err) {
      setError("送出失敗，請確認後端 API 是否啟動");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>BMI / BMR 計算器</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>身高 (公分): </label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </div>
        <div>
          <label>體重 (公斤): </label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>年齡: </label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>性別: </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <button type="submit">計算並送出</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>結果</h3>
          <p>身高: {result.height} 公分</p>
          <p>體重: {result.weight} 公斤</p>
          <p>年齡: {result.age}</p>
          <p>性別: {result.gender}</p>
          <p>BMI: {result.bmi.toFixed(2)} ({result.bmiCategory})</p>
          <p>BMR: {result.bmr.toFixed(0)} ({result.bmrStatus})</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default BMIBMRForm;
