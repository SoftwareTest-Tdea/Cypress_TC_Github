describe("Login en GitHub", () => {
  const username = "softwaretestingrepositorio@gmail.com";
  const password = "softwaretest23.";
  const usr = "SoftwareTest-Tdea";

  it("Debería iniciar sesión correctamente y validar todos los requisitos", () => {
    // 1. Navegar a la página de GitHub
    cy.visit("https://github.com/login");

    // 2. Validar que el título de la página es el correcto
    cy.title().should("eq", "Sign in to GitHub · GitHub");

    // 3. Validar que la URL es la esperada
    cy.url().should("eq", "https://github.com/login");

    // 4. Validar que los elementos de la página están presentes (botón, inputs, etc.)
    cy.get("#login_field").should("be.visible"); // Campo de usuario
    cy.get("#password").should("be.visible"); // Campo de contraseña
    cy.get(".position-relative > .btn").should("be.visible"); // Botón de login

    // 5. Validar que el botón de login tiene el estilo correcto (background-color)
    cy.get(".position-relative > .btn").should(
      "have.css",
      "background-color",
      "rgb(35, 134, 54)"
    );

    // 6. Ingresar el usuario
    cy.get("#login_field").type(username);

    // 7. Ingresar la contraseña
    cy.get("#password").type(password);

    // 8. Validar que los campos de texto contienen los valores correctos
    cy.get("#login_field").should("have.value", username);
    cy.get("#password").should("have.value", password);

    // 9. Hacer clic en el botón de login
    cy.get(".position-relative > .btn").click();

    // 10. Validar que el usuario se autentica correctamente o si hay un mensaje de error
    // Validar que el usuario es redirigido al dashboard
    cy.get('[data-target="feed-container.feedTitle"]').should(
      "contain.text",
      "Home"
    );

    // Validar que el nombre de usuario está visible en el menú de usuario (dropdown)
    cy.get(".Button-label > .avatar").click(); // Abrir menú de perfil
    cy.get(".text-bold > .Truncate__StyledTruncate-sc-23o1d2-0").should(
      "contain.text",
      usr
    ); // Validar que el usuario está presente
    // Valida que el atributo "id" es igual al valor esperado

    cy.get('input[name="repository[name]"]')
      // 2. Captura el valor del atributo 'id' del campo
      .invoke("attr", "id")
      // 3. Valida que el 'id' capturado sea igual al esperado
      .then((id) => {
        expect(id).to.equal("repository[name]"); // Compara con el valor esperado del id
      });
  });
});
