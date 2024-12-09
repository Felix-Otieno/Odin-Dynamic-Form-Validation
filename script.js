document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    const fields = [
      { id: "email", validator: validateEmail },
      { id: "country", validator: validateRequired },
      { id: "zip", validator: validateZip },
      { id: "password", validator: validatePassword },
      { id: "confirmPassword", validator: validateConfirmPassword }
    ];
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let hasErrors = false;
  
      fields.forEach(({ id, validator }) => {
        const input = document.getElementById(id);
        const errorElement = document.getElementById(`${id}Error`);
        const isValid = validator(input.value);
  
        if (!isValid) {
          input.classList.add("invalid");
          errorElement.textContent = getErrorMessage(id);
          hasErrors = true;
        } else {
          input.classList.remove("invalid");
          errorElement.textContent = "";
        }
      });
  
      if (!hasErrors) {
        document.getElementById("successMessage").textContent = "🎉 High five! Form submitted successfully!";
      }
    });
  
    fields.forEach(({ id, validator }) => {
      const input = document.getElementById(id);
      input.addEventListener("input", () => {
        const errorElement = document.getElementById(`${id}Error`);
        if (validator(input.value)) {
          input.classList.remove("invalid");
          errorElement.textContent = "";
        } else {
          input.classList.add("invalid");
          errorElement.textContent = getErrorMessage(id);
        }
      });
    });
  
    // Validators
    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
  
    function validateRequired(value) {
      return value.trim() !== "";
    }
  
    function validateZip(value) {
      return /^\d{5}$/.test(value);
    }
  
    function validatePassword(value) {
      return value.length >= 8;
    }
  
    function validateConfirmPassword(value) {
      const password = document.getElementById("password").value;
      return value === password;
    }
  
    function getErrorMessage(field) {
      const messages = {
        email: "Please enter a valid email.",
        country: "Country cannot be empty.",
        zip: "Zip Code must be 5 digits.",
        password: "Password must be at least 8 characters.",
        confirmPassword: "Passwords must match."
      };
      return messages[field];
    }
  });
  