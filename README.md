# employee-form-next.js

## 專案簡介

使用 Next.js 製作的簡易資料表應用程式，用戶可以透過 UI 新增資料、呼叫外部 API 儲存，並將 API 回傳的資料渲染在畫面上。

## 功能列表

- 透過 `Update` 按鈕，從外部 API 取得資料並顯示
- 透過 `Add` 按鈕，新增輸入列
- 透過 `Save` 按鈕，將新增的輸入列內容送到外部 API
- 資料欄位包含：
  - 姓名 (Name)
  - 生日 (Birthday)
  - 薪水 (Salary，使用 range slider)
  - 地址 (Address)

## 使用技術

- Next.js (App Router, Client Component)
- React (React Hooks)
- Fetch API

## API 使用方式

⚠️ **注意：此專案僅實作前端，沒有內建 API**  
若要測試功能，請自行準備一個外部 API，並將 endpoint 填入程式碼

程式中會呼叫的 API endpoint 包含：

### 取得資料 fetchData()
**GET** `請將 endpoint 改成你自己的 API 網址`

**回傳範例**
```json
{
  "Data": [
    {
      "Name": "John Doe",
      "DateOfBirth": "1995-01-01",
      "Salary": 50000,
      "Address": "Taipei"
    },
    {
      "Name": "Jane Smith",
      "DateOfBirth": "1990-05-12",
      "Salary": 60000,
      "Address": "Kaohsiung"
    }
  ]
}
```

### 新增資料 saveData()
**POST** `請將 endpoint 改成你自己的 API 網址`

Request Body
```json
[
  {
    "Name": "Alice Chen",
    "DateOfBirth": "1998-09-09",
    "Salary": 45000,
    "Address": "Taichung"
  }
]
```

**回傳範例**
```json
{
  "success": true
}
```

## 安裝與執行

### 前置需求

- Node.js (建議版本 16+)
- npm（隨 Node.js 一起安裝）

### 安裝套件

```bash
npm install
```

### 啟動開發環境

```bash
npm run dev
```
預設啟動於 http://localhost:3000

## 授權

此專案僅作為學習與展示用途
