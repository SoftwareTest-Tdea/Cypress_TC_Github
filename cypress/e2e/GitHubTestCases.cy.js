
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
    cy.get(".position-relative > .btn").invoke('css', 'background-color').then((bgColor) => {
      expect(bgColor).to.be.oneOf(['rgb(35, 134, 54)', 'rgb(31, 136, 61)']);
    });


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

describe("Buscar repositorio en GitHub", () => {
  const username = "softwaretestingrepositorio@gmail.com";
  const password = "softwaretest23.";
  const usr = "SoftwareTest-Tdea";

  it("Se debe inciar sesión y buscar un repositorio en especifico", () => {

    //1. Ingresar a la página web de gitHub
    cy.visit("https://github.com");

    //2. Dar clic en iniciar sesión
    cy.get('.text-right > .HeaderMenu-link').click();

    //3. Iniciar Sesión
    cy.get("#login_field").type(username);
    cy.get("#password").type(password);
    cy.get(".position-relative > .btn").click();

    //4. Verificar que se inició sesión correctamente y estamos en la dashboard
    cy.get('.AppHeader-context-item').should("contain", "Dashboard");

    //5. Verificar que el botón de búsqueda esté visible
    cy.get('.search-input-container > .AppHeader-button').should("be.visible");

    //6. Dar clic al botón de buscar
    cy.get('.search-input-container > .AppHeader-button').click();

    //7. Dar clic en el label destinado para la búsqueda y ganar el focus
    cy.get('.QueryBuilder-StyledInput').click();

    //8. Escribir el nombre del repositorio en específico que se quiere buscar y simular el enter del usuario
    cy.get('.QueryBuilder-StyledInput').type("SoftwareTest-Tdea/Cypress_TC_Github{enter}");

    //9. Verificar el titulo de la página que coincida con la página de resultado de búsqueda
    cy.title().should("eq", "Repository search results");

    //10. Verificar la url para confirmar que nos encontramos en la página de resultados de búsqueda según los criterios
    //de búsqueda enviados
    cy.url().should("eq", "https://github.com/search?q=SoftwareTest-Tdea%2FCypress_TC_Github&type=repositories");

    //11. Verificar que el contador de busquedas esté visible
    cy.get('.jJRiHe').should("be.visible");

    //12. Confirmar que al menos se haya un resultado para los criterios de búsqueda ingresados
    cy.get('.jJRiHe').should("contain", "1");

    //13. Vefiricar que el repositorio encontrado esté visible
    cy.get('.iwUbcA').should("be.visible");

    //14. Validar que el titulo que tiene el repositorio encontrado coincida con el que fue ingresado en los
    //criterios de búsqueda
    cy.get('.cvnppv > .kYLlPM').invoke("text").then((titulo) => {
      expect(titulo.trim()).to.equal("SoftwareTest-Tdea/Cypress_TC_Github");
    });

    //15. Validar que la descripción del repositorio cumpla con la esperada 
    cy.get('.dcdlju > .Box-sc-g0xbh4-0').should(
      "have.text",
      "This is a repository to save test cases for a college homework");

    //16. Validar el color de fondo de la barra de navegación (header)
    cy.get('.AppHeader-globalBar').should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    //17. Validar el color de fondo de la sección de resultados
    cy.get('.FxAyp').should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    //18. Validar el color del texto del link del repositorio encontrado (Título del Repositorio)
    cy.get('.MHoGG > .prc-Link-Link-85e08').should(
      "have.css",
      "color",
      "rgb(68, 147, 248)"
    );

    //19. Validar el color del texto de la descripción del repositorio
    cy.get('.dcdlju > .Box-sc-g0xbh4-0').should(
      "have.css",
      "color",
      "rgb(240, 246, 252)"
    );

    //20. Validar que esté visible el menú desplegable
    cy.get('#global-create-menu-anchor').should("be.visible");

    //21. Dar click en el menú desplegable para desplegar sus opciones
    cy.get('#global-create-menu-anchor').click();

    //22. Verifica que los elementos desplegados de la lista estén visibles
    cy.get(':nth-child(2) > .List__ListBox-sc-1x7olzq-0').should("be.visible");

    //23. Verfica que hayan elementos presentes en la lista desplegable, es decir, que le número de elementos sea
    //mayor a cero
    cy.get(':nth-child(2) > .List__ListBox-sc-1x7olzq-0').find("a").should(($elementos) => {
      expect($elementos).to.have.length.greaterThan(0);
    });
  });
});

describe("Edición del perfil de Usuario en GitHub", () => {
  const username = "softwaretestingrepositorio@gmail.com";
  const password = "softwaretest23.";
  const usr = "SoftwareTest-Tdea";

  it('Se debe iniciar sesión y verificar que usuario pueda editar su perfil correctamente', () => {

    //1. Ingresar a la página web de GitHub
    cy.visit('https://github.com')
    cy.url().should('eq', 'https://github.com/')

    //2. Click boton iniciar sesión
    cy.get('.text-right > .HeaderMenu-link').click()
    cy.url().should('eq', 'https://github.com/login')

    //3. Ingresar los datos para el inicio de sesión
    cy.get('#login_field').should('be.visible').type(username)
    cy.get('#password').should('be.visible').type(password)
    cy.get('.position-relative > .btn').click()

    //4. Validar el login exitoso
    cy.title().should('eq', 'GitHub');

    //5. Ir al menú del perfil y hacer click en 'Your profile'
    cy.get('.Button-label > .avatar').click()
    cy.get('.Dialog__Body-sc-uaxjsn-5').should('be.visible')
    cy.get(`a[href="/${usr}"]`).should('be.visible')
    cy.get(`a[href="/${usr}"]`).click()

    //6. Verificar que el boton "Edit profile" está visible y hacer click
    cy.get('.js-profile-editable-edit-button').should('be.visible')
    cy.get('.js-profile-editable-edit-button').click()

    //7. Datos del perfil
    //7.1. Cambiar nombre de usuario
    cy.get('#user_profile_name').should('be.visible').clear().type('Software Testing TC03')

    //7.2. Cambiar la biografia
    cy.get('#user_profile_bio').should('be.visible').clear().type('Biografia actualizada para el TC03')

    //7.3. Cambiar el pronombre
    cy.get('#user_profile_pronouns').should('be.visible').select('Custom')
    cy.get('.js-profile-editable-pronouns-custom').clear().type('Tanque de guerra')

    //7.4. Cambiar la compañia
    cy.get(':nth-child(6) > .ml-2').should('be.visible').clear().type('Movistar')

    //7.5. Cambiar la locación
    cy.get(':nth-child(7) > .ml-2').should('be.visible').clear().type('Cra. 50 #52-26')

    //8. Validar los estilos del botón "Save"
    cy.get(':nth-child(12) > .Button--primary').should('have.css', 'background-color', 'rgb(35, 134, 54)')
    cy.get(':nth-child(12) > .Button--primary').should('have.css', 'font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"')

    //9. Darle click al boton "Save" para guardar los cambios
    cy.get(':nth-child(12) > .Button--primary').click()


    //10. Validar que los campos se han actualizado correctamente

    //10.1. Validar que la pestaña "Overview" está seleccionada
    cy.get('#overview-tab').should('have.class', 'selected');

    //10.2. Validar que el nombre de usuario se ha actualizado
    cy.get('span.p-name.vcard-fullname').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Software Testing TC03');
    });

    //10.3. Validar que la biografía se ha actualizado
    cy.get('.user-profile-bio').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Biografia actualizada para el TC03');
    });

    //10.4. Validar que el pronombre personalizado se ha actualizado
    cy.get('.js-profile-editable-pronouns-custom').should('have.value', 'Tanque de guerra');

    //10.5. Validar que la compañía se ha actualizado
    cy.get('.p-org').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Movistar');
    });

    //10.6. Validar que la ubicación se ha actualizado
    cy.get('.p-label').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Cra. 50 #52-26');
    });

    //11. Validar la URL es la correcta para el perfil
    cy.url().should('include', `/${usr}`);

    //12. Validar la imagen del perfil sea presente
    cy.get('#upload-avatar-link > .avatar').should('be.visible')

  });
})