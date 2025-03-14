const apiUrl = "https://67cafd743395520e6af3e950.mockapi.io/api/Users";

//получение данных с помощью GET
const fetchContacts = () => {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((data) => {
      const contactList = document.getElementById("contactList");
      contactList.innerHTML = "";
      data.forEach((contact) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${contact.имя} - ${contact.телефон}`;

        //кнопка редактирования
        const editButton = document.createElement("button");
        editButton.textContent = "Изменить";
        editButton.classList.add("edit");
        editButton.onclick = () =>
          editContact(contact.id, contact.имя, contact.телефон);

        //кнопка удаления
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deleteContact(contact.id);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        contactList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Ошибка при получении данных:", error));
};

// Добавление нового контакта с помощью POST
const addContact = () => {
  const nameInput = document.getElementById("nameInput").value;
  const phoneInput = document.getElementById("phoneInput").value;

  if (!nameInput || !phoneInput) {
    alert("Пожалуйста, заполните оба поля!");
    return;
  }

  const newContact = {
    имя: nameInput,
    телефон: phoneInput,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContact),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети при добавлении");
      }
      return response.json();
    })
    .then(() => {
      alert("Новый контакт добавлен");
      fetchContacts();
    })
    .catch((error) => console.error("Ошибка при добавлении контакта:", error));
};

// Редактирование контакта с помощьюю PUT
const editContact = (id, currentName, currentPhone) => {
  const newName = prompt("Введите новое имя", currentName);
  const newPhone = prompt("Введите новый телефон", currentPhone);

  if (!newName || !newPhone) {
    alert("Оба поля должны быть заполнены!");
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ имя: newName, телефон: newPhone }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети при редактировании");
      }
      return response.json();
    })
    .then(() => {
      alert("Контакт обновлён");
      fetchContacts();
    })
    .catch((error) =>
      console.error("Ошибка при редактировании контакта:", error)
    );
};

// Удаление контакта короче
const deleteContact = (id) => {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети при удалении");
      }
      alert("Контакт удалён");
      fetchContacts();
    })
    .catch((error) => console.error("Ошибка при удалении контакта:", error));
};

document.addEventListener("DOMContentLoaded", fetchContacts);