'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

function Table() {
  // 儲存 API 取得的資料
  const [data, setData] = useState([]);
  // 儲存新增的輸入欄位
  const [newRow, setNewRow] = useState([]);

  // 點擊 "Update" 按鈕時，GET API 資料
  const fetchData = async () => {
    try {
      // url 插入 API 網址
      const url = ``;
      const res = await fetch(url);
      const result = await res.json();

      // 檢查 API 回傳成功內容
      console.log('Response Ex:', result);

      // 確保 `result.Data` 存在且是陣列
      if (result && Array.isArray(result.Data)) {
        // 只存入 Data 陣列
        setData(result.Data);
      } else {
        console.error('Unexpected API response format:', result);
        setData([]); // 設定空陣列，避免 `data.map` 出錯
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // 避免錯誤導致頁面崩潰
    }
  };

  // 點擊 "Save" 按鈕時，儲存新增的輸入欄位
  const saveData = async () => {
    // 沒有新增任何輸入欄位時，不執行儲存
    if (newRow.length === 0) {
      return;
      // 直接 return，不繼續執行
    }

    // 檢查是否有輸入資料，並且沒有空值
    const isEmpty = newRow.some(
      (row) =>
        !row.name?.trim() ||
        !row.birthday?.trim() ||
        row.salary === undefined ||
        !row.address?.trim()
    );

    if (isEmpty) {
      alert('Please fill in all the fields');
      return;
      // 直接 return，不繼續執行
    }

    try {
      // 包裝 newRow 參數，將 newRow 陣列轉換為符合 API 格式的資料
      let postPara = newRow.map((row) => ({
        Name: row.name,
        DateOfBirth: row.birthday,
        Salary: row.salary,
        Address: row.address,
      }));

      // 向 API 發送 POST 請求
      // url 插入 API 網址
      const url = ``;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPara),
      };
      const response = await fetch(url, options);
      const result = await response.json();

      // 檢查 API 回傳內容
      console.log('API response:', result);

      // 根據 API 回傳結果進行相應處理
      if (response.ok) {
        alert('Data saved successfully!');
        setNewRow([]); // 恢復為空陣列
        fetchData(); // 重新取得資料
      } else {
        console.error('Failed to save data:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 點擊 "Add" 按鈕時，新增空白輸入欄位
  function addRow() {
    setNewRow([...newRow, { name: '', birthday: '', salary: 0, address: '' }]);
  }

  // 更新 newRow 中的資料
  // onChange 事件觸發時，更新對應的輸入欄位資料
  function handleInputChange(index, field, value) {
    const updatedRows = [...newRow];
    updatedRows[index][field] = value;
    setNewRow(updatedRows);
  }

  return (
    // buttonGroup
    <div className={styles.container}>
      <ButtonGroup fetchData={fetchData} saveData={saveData} addRow={addRow} />

      {/* 表頭 */}
      <table className={styles.table}>
        <TableHeader />

        <tbody>
          {/* API 取得的資料 */}
          {data.map((row, index) => (
            <TableRow key={index} row={row} />
          ))}

          {/* 新增的輸入欄位 */}
          {newRow.map((row, index) => (
            <NewRow
              key={`new-${index}`}
              row={row}
              index={index}
              handleInputChange={handleInputChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 按鈕群組元件
function ButtonGroup({ fetchData, saveData, addRow }) {
  return (
    <div className={styles.buttonGroup}>
      <button className={styles.addButton} onClick={addRow}>
        Add
      </button>
      <button className={styles.saveButton} onClick={saveData}>
        Save
      </button>
      <button className={styles.updateButton} onClick={fetchData}>
        Update
      </button>
    </div>
  );
}

// 表頭元件
function TableHeader() {
  return (
    <thead>
      <tr>
        <th className={styles.tableHeader}>Name</th>
        <th className={styles.tableHeader}>Birthday</th>
        <th className={styles.tableHeader}>Salary</th>
        <th className={styles.tableHeader}>Address</th>
      </tr>
    </thead>
  );
}

// API 取得的資料元件
function TableRow({ row }) {
  return (
    <tr className={styles.divider}>
      <td>
        <input type="text" className={styles.input} value={row.Name} readOnly />
      </td>
      <td>
        <input
          type="date"
          className={styles.input}
          value={row.DateOfBirth ? row.DateOfBirth.split('T')[0] : ''}
          readOnly
        />
      </td>
      <td>
        <input
          type="range"
          className={styles.slider}
          min="0"
          max="100000"
          value={row.Salary}
          readOnly
        />
      </td>
      <td>
        <input
          type="text"
          className={styles.input}
          value={row.Address}
          readOnly
        />
      </td>
    </tr>
  );
}

// 新增輸入欄位元件
function NewRow({ row, index, handleInputChange }) {
  return (
    <tr className={styles.row}>
      <td>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Name"
          value={row.name}
          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
        />
      </td>
      <td>
        <input
          type="date"
          className={styles.input}
          value={row.birthday}
          onChange={(e) => handleInputChange(index, 'birthday', e.target.value)}
        />
      </td>
      <td>
        <input
          type="range"
          className={styles.slider}
          min="0"
          max="100000"
          value={row.salary}
          onChange={(e) => handleInputChange(index, 'salary', e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Address"
          value={row.address}
          onChange={(e) => handleInputChange(index, 'address', e.target.value)}
        />
      </td>
    </tr>
  );
}

export default Table;
