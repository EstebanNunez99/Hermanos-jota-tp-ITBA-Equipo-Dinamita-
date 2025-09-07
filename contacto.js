// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("contactForm");
//   const successMessage = document.getElementById("successMessage");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     // agarramos los valores del formulario
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const message = document.getElementById("message").value.trim();

//     // chekeamos que no esté vacío
//     if (!name || !email || !message) {
//       alert("Porfa completá todos los campos, no te olvides de nada!");
//       return;
//     }

//     // validamos el email con una expresion re loca
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       alert("Ese email no parece válido, fijate bien 😬");
//       return;
//     }

//     // Si todo está OK, mostramos el mensajito de éxito
//     successMessage.style.display = "block";
//     form.reset();
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // agarramos los valores del formulario
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // chekeamos que no esté vacío
    if (!name || !email || !message) {
      alert("Porfa completá todos los campos, no te olvides de nada!");
      return;
    }

    // validamos el email con una expresion re loca
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Ese email no parece válido, fijate bien 😬");
      return;
    }

    // Si todo está OK, mostramos el mensajito de éxito
    successMessage.style.display = "block";
    form.reset();
  });
});
