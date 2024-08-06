document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  function showError(inputElement, message) {
    const formGroup = inputElement.closest(".form-group");
    const error =
      formGroup.querySelector(".error-message") ||
      document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    if (!formGroup.querySelector(".error-message")) {
      formGroup.appendChild(error);
    }
    inputElement.classList.add("invalid");
  }

  function removeError(inputElement) {
    const formGroup = inputElement.closest(".form-group");
    const error = formGroup.querySelector(".error-message");
    if (error) {
      formGroup.removeChild(error);
    }
    inputElement.classList.remove("invalid");
  }

  function validateField(field) {
    removeError(field);

    switch (field.name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Z]{1,30}$/.test(field.value)) {
          showError(
            field,
            `${
              field.name === "firstName" ? "First" : "Last"
            } name should contain only letters and be up to 30 characters long.`
          );
          return false;
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          showError(field, "Please enter a valid email address.");
          return false;
        }
        break;
      case "mobile":
        if (!/^\d{10}$/.test(field.value)) {
          showError(field, "Mobile number should be 10 digits.");
          return false;
        }
        break;
      case "pincode":
        if (!/^\d{6}$/.test(field.value)) {
          showError(field, "PIN Code should be 6 digits.");
          return false;
        }
        break;
      case "city":
      case "state":
        if (!/^[a-zA-Z\s]{1,30}$/.test(field.value)) {
          showError(
            field,
            `${
              field.name.charAt(0).toUpperCase() + field.name.slice(1)
            } should contain only letters and spaces, up to 30 characters.`
          );
          return false;
        }
        break;
      case "dob":
        const dobDate = new Date(field.value);
        const today = new Date();
        const minDate = new Date(
          today.getFullYear() - 100,
          today.getMonth(),
          today.getDate()
        );
        if (dobDate > today || dobDate < minDate) {
          showError(field, "Please enter a valid date of birth.");
          return false;
        }
        break;
    }

    return true;
  }

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    form.querySelectorAll("input, textarea, select").forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      const formData = new FormData(form);

      fetch("submit.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Success:", data);
          alert("Form submitted successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    }
  });

  function maskInput(input, pattern) {
    input.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      e.target.value = pattern
        .replace(/9/g, function () {
          return value.charAt(0) || "";
        })
        .replace(/0/g, function () {
          return value.charAt(value.length - 1) || "";
        });
    });
  }

  maskInput(document.getElementById("mobile"), "9999999990");
  maskInput(document.getElementById("pincode"), "999999");

  // Define showParticipants function
  window.showParticipants = function(event) {
    fetch(`participant.php?event=${encodeURIComponent(event)}`)
      .then(response => response.text())
      .then(data => {
        const popup = document.getElementById('popup');
        popup.querySelector('.popup-content').innerHTML = data;
        popup.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
        const popup = document.getElementById('popup');
        popup.querySelector('.popup-content').innerHTML = 'Failed to load participants.';
        popup.style.display = 'block';
      });
  };

  // Close popup when clicking outside of it
  window.onclick = function(event) {
    if (event.target == document.getElementById('popup')) {
      document.getElementById('popup').style.display = 'none';
    }
  };
});
