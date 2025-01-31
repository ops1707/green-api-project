// Получаем элементы со страницы
const idInstanceInput = document.getElementById("idInstance");
const apiTokenInstanceInput = document.getElementById("apiTokenInstance");
const responseArea = document.getElementById("response");

// Кнопки
const getSettingsButton = document.getElementById("getSettings");
const getStateInstanceButton = document.getElementById("getStateInstance");
const sendMessageButton = document.getElementById("sendMessage");
const sendFileByUrlButton = document.getElementById("sendFileByUrl");

// Поля для отправки сообщений
const phoneNumberInput = document.getElementById("phoneNumber");
const messageInput = document.getElementById("message");
const fileUrlInput = document.getElementById("fileUrl");

// Базовый URL GREEN-API
const BASE_URL = "https://api.green-api.com";

// Функция для вызова API
async function callApi(endpoint, method = "GET", body = null) {
  const idInstance = idInstanceInput.value.trim();
  const apiTokenInstance = apiTokenInstanceInput.value.trim();

  if (!idInstance || !apiTokenInstance) {
    alert("Введите ID Instance и API Token Instance.");
    return;
  }

  const url = `${BASE_URL}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;

  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();
    responseArea.value = JSON.stringify(data, null, 2);
  } catch (error) {
    responseArea.value = `Ошибка: ${error.message}`;
  }
}

// Обработчики кнопок
getSettingsButton.addEventListener("click", () => {
  callApi("getSettings");
});

getStateInstanceButton.addEventListener("click", () => {
  callApi("getStateInstance");
});

sendMessageButton.addEventListener("click", () => {
  const phoneNumber = phoneNumberInput.value.trim();
  const message = messageInput.value.trim();

  if (!phoneNumber || !message) {
    alert("Введите номер телефона и сообщение.");
    return;
  }

  const body = {
    chatId: `${phoneNumber}@c.us`,
    message
  };

  callApi("sendMessage", "POST", body);
});

sendFileByUrlButton.addEventListener("click", () => {
  const phoneNumber = phoneNumberInput.value.trim();
  const fileUrl = fileUrlInput.value.trim();

  if (!phoneNumber || !fileUrl) {
    alert("Введите номер телефона и URL файла.");
    return;
  }

  const body = {
    chatId: `${phoneNumber}@c.us`,
    urlFile: fileUrl
  };

  callApi("sendFileByUrl", "POST", body);
});
